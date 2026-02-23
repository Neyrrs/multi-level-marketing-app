import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Binary Tree',
        href: '/affiliate/binary',
    },
];

interface BinaryNode {
    id: number;
    name: string;
    username: string;
    position: string;
    level: number;
    is_active: boolean;
}

interface BinaryStats {
    leftCount: number;
    rightCount: number;
    pairCount: number;
    leftVolume: number;
    rightVolume: number;
    totalVolume: number;
}

interface BinaryTree {
    left: BinaryNode | null;
    right: BinaryNode | null;
}

interface Props {
    affiliate?: {
        id: number;
        name: string;
        username: string;
        level: number;
    } | null;
    binaryTree: BinaryTree;
    stats: BinaryStats;
}

export default function BinaryComponent({ affiliate, binaryTree, stats }: Props) {
    if (!affiliate) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Binary Tree" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <Card>
                        <CardContent className="pt-6 text-center text-gray-500">
                            Data affiliate tidak ditemukan. Silakan login kembali.
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    const renderNode = (node: BinaryNode | null, position: string) => {
        if (!node)
            return (
                <div className="text-center py-4 text-gray-400">
                    Kosong
                </div>
            );

        return (
            <Card>
                <CardContent className="pt-6">
                    <div className="text-sm space-y-1">
                        <p className="font-semibold">{node.name}</p>
                        <p className="text-gray-600">@{node.username}</p>
                        <p className="text-gray-600">Level: {node.level}</p>
                        <p className="text-xs">
                            <span className={`px-2 py-1 rounded-full ${
                                node.is_active
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {node.is_active ? 'Aktif' : 'Tidak Aktif'}
                            </span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Binary Tree" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Struktur Binary</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                        <p>Nama: <span className="font-semibold">{affiliate.name}</span></p>
                        <p>Username: <span className="font-semibold">@{affiliate.username}</span></p>
                        <p>Level: <span className="font-semibold">{affiliate.level}</span></p>
                    </CardContent>
                </Card>

                {/* Statistics Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Kiri
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.leftCount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Kanan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.rightCount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Pasangan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pairCount}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Binary Tree Structure */}
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="font-semibold mb-6">Struktur Kiri-Kanan</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium text-sm text-gray-600 mb-3">Posisi Kiri</h4>
                            {renderNode(binaryTree.left, 'left')}
                        </div>
                        <div>
                            <h4 className="font-medium text-sm text-gray-600 mb-3">Posisi Kanan</h4>
                            {renderNode(binaryTree.right, 'right')}
                        </div>
                    </div>
                </div>

                {/* Volume Information */}
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="font-semibold mb-4">Informasi Volume</h3>
                    <div className="space-y-2 text-sm">
                        <p className="flex justify-between">
                            <span className="text-gray-600">Volume Kiri:</span>
                            <span className="font-semibold">Rp {stats.leftVolume.toLocaleString('id-ID')}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-600">Volume Kanan:</span>
                            <span className="font-semibold">Rp {stats.rightVolume.toLocaleString('id-ID')}</span>
                        </p>
                        <p className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Total Volume:</span>
                            <span className="font-bold">Rp {stats.totalVolume.toLocaleString('id-ID')}</span>
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
