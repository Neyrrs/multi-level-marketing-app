<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$schema = 'public';

$tables = DB::table('information_schema.tables')
    ->select('table_name')
    ->where('table_schema', $schema)
    ->where('table_type', 'BASE TABLE')
    ->orderBy('table_name')
    ->pluck('table_name')
    ->all();

$pkRows = DB::select(<<<SQL
SELECT tc.table_name, kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
 AND tc.table_schema = kcu.table_schema
WHERE tc.constraint_type = 'PRIMARY KEY'
  AND tc.table_schema = ?
ORDER BY tc.table_name, kcu.ordinal_position
SQL, [$schema]);

$pkMap = [];
foreach ($pkRows as $row) {
    $pkMap[$row->table_name][] = $row->column_name;
}

$fkRows = DB::select(<<<SQL
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
 AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
 AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = ?
ORDER BY tc.table_name, tc.constraint_name, kcu.ordinal_position
SQL, [$schema]);

$out = [];
$out[] = "// Auto-generated from database: {$schema}";
$out[] = "";

foreach ($tables as $table) {
    $columns = DB::table('information_schema.columns')
        ->select('column_name', 'data_type', 'udt_name', 'is_nullable', 'column_default', 'character_maximum_length', 'numeric_precision', 'numeric_scale')
        ->where('table_schema', $schema)
        ->where('table_name', $table)
        ->orderBy('ordinal_position')
        ->get();

    $out[] = "Table {$table} {";

    $pkCols = $pkMap[$table] ?? [];

    foreach ($columns as $col) {
        $type = $col->data_type;
        if ($type === 'USER-DEFINED') {
            $type = $col->udt_name;
        }

        if ($type === 'character varying' && $col->character_maximum_length) {
            $type = "varchar({$col->character_maximum_length})";
        } elseif ($type === 'numeric' && $col->numeric_precision) {
            $scale = $col->numeric_scale ?? 0;
            $type = "numeric({$col->numeric_precision},{$scale})";
        } elseif ($type === 'timestamp without time zone') {
            $type = 'timestamp';
        } elseif ($type === 'timestamp with time zone') {
            $type = 'timestamptz';
        } elseif ($type === 'double precision') {
            $type = 'double';
        } elseif ($type === 'integer') {
            $type = 'int';
        } elseif ($type === 'bigint') {
            $type = 'bigint';
        } elseif ($type === 'boolean') {
            $type = 'boolean';
        } elseif ($type === 'text') {
            $type = 'text';
        } elseif ($type === 'json' || $type === 'jsonb') {
            $type = 'json';
        }

        $settings = [];

        if (in_array($col->column_name, $pkCols, true)) {
            $settings[] = 'pk';
        }

        if ($col->is_nullable === 'NO') {
            $settings[] = 'not null';
        }

        if ($col->column_default !== null) {
            $default = str_replace('"', '\\"', (string) $col->column_default);
            $settings[] = "default: `{$default}`";
        }

        $settingText = $settings ? ' [' . implode(', ', $settings) . ']' : '';
        $out[] = "  {$col->column_name} {$type}{$settingText}";
    }

    $out[] = "}";
    $out[] = "";
}

foreach ($fkRows as $fk) {
    $out[] = "Ref: {$fk->table_name}.{$fk->column_name} > {$fk->foreign_table_name}.{$fk->foreign_column_name}";
}

$file = __DIR__ . '/dbdiagram.dbml';
file_put_contents($file, implode(PHP_EOL, $out) . PHP_EOL);

echo "Generated: {$file}" . PHP_EOL;
