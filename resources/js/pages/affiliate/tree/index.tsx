import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    left_children?: TreeNode[];
    right_children?: TreeNode[];
}

interface Props {
    treeData: TreeNode;
}

const TreeNodeComponent = ({ node }: { node: TreeNode | null }) => {
    if (!node) return null;

    return (
        <div className="flex flex-col items-center gap-2">
            <Card className="w-32">
                <CardContent className="text-center pt-4">
                    <div className="font-semibold text-sm">{node.name}</div>
                    <div className="text-xs text-gray-600">@{node.username}</div>
                </CardContent>
            </Card>
            <div className="flex gap-8">
                <div>
                    {node.left_children && node.left_children.length > 0 && (
                        <TreeNodeComponent node={node.left_children[0]} />
                    )}
                </div>
                <div>
                    {node.right_children && node.right_children.length > 0 && (
                        <TreeNodeComponent node={node.right_children[0]} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default function TreePage({ treeData }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pohon Jaringan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border bg-white p-6 overflow-auto">
                    <h3 className="font-semibold mb-6 text-center">Struktur Jaringan Affiliate</h3>
                    <div className="flex justify-center">
                        <TreeNodeComponent node={treeData} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
