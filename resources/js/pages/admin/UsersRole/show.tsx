import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'User Role', href: dashboard().url },
    { title: 'Detail', href: '#' },
];

export default function Show({ role }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Role" />

            <div className="max-w-xl rounded-xl border p-4">
                <h1 className="mb-4 text-lg font-semibold">Detail Role</h1>

                <div className="space-y-2 text-sm">
                    <div>
                        <span className="font-medium">Nama Role:</span>{' '}
                        {role.name}
                    </div>
                </div>

                <div className="mt-4">
                    <Link
                        href="/user-role"
                        className="text-sm text-blue-600"
                    >
                        ← Kembali
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
