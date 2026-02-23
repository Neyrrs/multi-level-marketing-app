<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification as Notifier;

class NotificationController extends Controller
{
    public function list(Request $request)
    {
        $perPage = (int) $request->input('per_page', 25);
        $notifications = DatabaseNotification::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($notifications);
    }

    public function resend(string $id)
    {
        $notif = DatabaseNotification::find($id);
        if (!$notif) return response()->json(['error' => 'not found'], 404);

        try {
            $user = User::find($notif->notifiable_id);
            if (!$user) return response()->json(['error' => 'notifiable not found'], 404);

            // Attempt to resend by re-dispatching a generic notification if possible
            $type = $notif->type;
            if ($type && class_exists($type)) {
                $data = $notif->data ?? [];
                // If notification class can be constructed with array, try that
                try {
                    $instance = new $type($data);
                    Notifier::send($user, $instance);
                    return response()->json(['ok']);
                } catch (\Throwable $e) {
                    Log::warning('Resend: could not instantiate original notification: ' . $e->getMessage());
                }
            }

            // Fallback: re-create database notification record
            DatabaseNotification::create([
                'id' => (string) \Illuminate\Support\Str::uuid(),
                'notifiable_type' => get_class($user),
                'notifiable_id' => $user->id,
                'type' => $notif->type,
                'data' => json_encode($notif->data ?? []),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            return response()->json(['ok']);
        } catch (\Throwable $e) {
            Log::error('Resend notification error: ' . $e->getMessage());
            return response()->json(['error' => 'resend failed'], 500);
        }
    }
}
