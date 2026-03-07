import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pohon Jaringan',
        href: '/affiliate/tree',
    },
];

interface TreeNode {
    id: number;
    name: string;
    username: string;
    position: string;
    level: number;
    is_active: boolean;
    depth: number;
    left?: TreeNode | null;
    right?: TreeNode | null;
}

interface Props {
    treeData: TreeNode | null;
    currentAffiliate?: {
        id: number;
        name: string;
        username: string;
        level: number;
        position: string;
    } | null;
    focusAffiliate?: {
        id: number;
        name: string;
        username: string;
        level: number;
        position: string;
    } | null;
    maxDepth: number;
}

const TreeNodeComponent = ({ node }: { node: TreeNode | null }) => {
    if (!node) return null;

    return (
        <div className="flex flex-col items-center gap-2">
            <Card className="w-44">
                <CardContent className="text-center pt-4">
                    <div className="font-semibold text-sm">{node.name}</div>
                    <div className="text-xs text-gray-600">@{node.username}</div>
                    <div className="text-[10px] text-gray-500 mt-1">
                        Level {node.level} | {node.position}
                    </div>
                    <div className="text-[10px] mt-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.get('/affiliate/tree', { focus: node.id }, { preserveState: true })}
                        >
                            Lihat Node
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="flex gap-8">
                <div>
                    {node.left ? <TreeNodeComponent node={node.left} /> : (
                        <div className="text-xs text-gray-400 text-center">Kiri kosong</div>
                    )}
                </div>
                <div>
                    {node.right ? <TreeNodeComponent node={node.right} /> : (
                        <div className="text-xs text-gray-400 text-center">Kanan kosong</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function TreePage({ treeData, currentAffiliate, focusAffiliate, maxDepth }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pohon Jaringan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="rounded-xl border bg-white p-6 overflow-auto">
                    <h3 className="font-semibold mb-6 text-center">Struktur Jaringan Affiliate</h3>
                    {currentAffiliate && (
                        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600">
                            <span>Root: @{currentAffiliate.username}</span>
                            <span>|</span>
                            <span>Fokus: @{focusAffiliate?.username ?? currentAffiliate.username}</span>
                            <span>|</span>
                            <span>Depth aktif: {maxDepth}</span>
                            {focusAffiliate && currentAffiliate.id !== focusAffiliate.id && (
                                <>
                                    <span>|</span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => router.get('/affiliate/tree', {}, { preserveState: true })}
                                    >
                                        Kembali ke Root
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                    <div className="flex justify-center">
                        <TreeNodeComponent node={treeData} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
