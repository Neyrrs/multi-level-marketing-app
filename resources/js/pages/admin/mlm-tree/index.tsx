import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboardUrl } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'MLM Tree',
        href: '/admin/mlm-tree',
    },
];

interface TreeNode {
    id: number;
    name: string;
    username: string;
    level: number;
    position: string;
    direct_downline: number;
    total_downline: number;
    total_volume: number;
    is_active: boolean;
    children: TreeNode[];
}

interface MlmTreeProps {
    treeData: TreeNode;
    affiliateNode: {
        id: number;
        name: string;
        username: string;
        level: number;
        total_downline: number;
        total_volume: number;
    };
    totalDownline: number;
    message?: string;
}

const TreeNodeComponent = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
    const [expanded, setExpanded] = useState(level < 2); // Expand first 2 levels by default

    const positionBadgeColor = {
        left: 'bg-blue-100 text-blue-800',
        right: 'bg-green-100 text-green-800',
        none: 'bg-gray-100 text-gray-800',
    }[node.position] || 'bg-gray-100 text-gray-800';

    const levelBadgeColor = {
        1: 'bg-yellow-100 text-yellow-800',
        2: 'bg-orange-100 text-orange-800',
        3: 'bg-red-100 text-red-800',
        4: 'bg-purple-100 text-purple-800',
        5: 'bg-pink-100 text-pink-800',
    }[node.level] || 'bg-gray-100 text-gray-800';

    return (
        <div className="ml-4">
            <div className="flex items-center gap-2 p-3 mb-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                {node.children.length > 0 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="p-1 hover:bg-gray-200 rounded"
                    >
                        {expanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                )}

                <div className="flex-grow">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{node.name}</h4>
                        <span className="text-xs px-2 py-1 rounded bg-gray-800 text-white">
                            @{node.username}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${levelBadgeColor}`}>
                            Level {node.level}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${positionBadgeColor}`}>
                            {node.position.toUpperCase()}
                        </span>
                        {!node.is_active && (
                            <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
                                INACTIVE
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                        📊 Direct: {node.direct_downline} | Total: {node.total_downline} | Volume: Rp{' '}
                        {(node.total_volume / 1000000).toFixed(1)}M
                    </div>
                </div>
            </div>

            {expanded && node.children.length > 0 && (
                <div className="border-l-2 border-gray-300 pl-2">
                    {node.children.map((child) => (
                        <TreeNodeComponent key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function MlmTree({ treeData, affiliateNode, totalDownline, message }: MlmTreeProps) {
    if (!treeData || message) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="MLM Tree" />
                <div className="p-6">
                    <Card className="p-12 text-center">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold mb-2">Tidak Ada Data</h3>
                        <p className="text-gray-600">{message || 'MLM tree data tidak tersedia'}</p>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="MLM Tree" />
            <div className="flex flex-col gap-6 p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Nama Anda</p>
                            <p className="text-2xl font-bold">{affiliateNode.name}</p>
                            <p className="text-xs text-gray-500">@{affiliateNode.username}</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Downline</p>
                            <p className="text-3xl font-bold text-blue-600">{totalDownline}</p>
                            <p className="text-xs text-gray-500">Semua Level</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Volume</p>
                            <p className="text-2xl font-bold">
                                Rp {(affiliateNode.total_volume / 1000000).toFixed(1)}M
                            </p>
                            <p className="text-xs text-gray-500">Semua Transaksi</p>
                        </div>
                    </Card>
                </div>

                {/* Legend */}
                <Card className="p-6">
                    <h3 className="font-semibold mb-4">Keterangan</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Position: Left</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Position: Right</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Level: 1</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">Level: 3+</span>
                        </div>
                    </div>
                </Card>

                {/* Tree Structure */}
                <Card className="p-6">
                    <h3 className="font-semibold mb-4">Struktur Jaringan Anda</h3>
                    <div className="overflow-x-auto">
                        <TreeNodeComponent node={treeData} level={0} />
                    </div>
                </Card>

                {/* Info */}
                <Card className="p-6 bg-blue-50 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Informasi</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>✓ Anda hanya bisa melihat downline Anda sendiri</li>
                        <li>✓ Level menunjukkan kedalaman dari struktur Anda</li>
                        <li>✓ Position (Left/Right) menunjukkan posisi dalam binary tree</li>
                        <li>✓ Volume adalah total pembelian dari affiliate tersebut</li>
                    </ul>
                </Card>
            </div>
        </AppLayout>
    );
}
