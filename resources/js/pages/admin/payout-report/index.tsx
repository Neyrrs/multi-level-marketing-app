import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { useState } from 'react';

interface PayoutReport {
    approved_total: number;
    paid_total: number;
    count: number;
}

interface Props {
    report?: PayoutReport;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Laporan Pembayaran',
        href: '#',
    },
];

export default function PayoutReportIndex({ report }: Props) {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleGenerateReport = () => {
        router.get('/admin/payout-report', {
            from: fromDate,
            to: toDate,
        });
    };

    const handleExport = () => {
        // Placeholder for export functionality
        alert('Fitur export akan segera tersedia');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Pembayaran" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Laporan Pembayaran (Payout)</h1>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-lg border p-6">
                    <h2 className="text-lg font-semibold mb-4">Filter Laporan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Dari Tanggal:
                            </label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Sampai Tanggal:
                            </label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                onClick={handleGenerateReport}
                                className="w-full"
                            >
                                Buat Laporan
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Report Summary */}
                {report && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-sm font-medium text-blue-600 mb-2">
                                Total Disetujui
                            </h3>
                            <p className="text-2xl font-bold">
                                Rp{' '}
                                {new Intl.NumberFormat('id-ID').format(report.approved_total)}
                            </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h3 className="text-sm font-medium text-green-600 mb-2">
                                Total Dibayar
                            </h3>
                            <p className="text-2xl font-bold">
                                Rp{' '}
                                {new Intl.NumberFormat('id-ID').format(report.paid_total)}
                            </p>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                            <h3 className="text-sm font-medium text-purple-600 mb-2">
                                Jumlah Transaksi
                            </h3>
                            <p className="text-2xl font-bold">{report.count}</p>
                        </div>
                    </div>
                )}

                {/* Export Button */}
                {report && (
                    <div className="flex justify-end">
                        <Button
                            onClick={handleExport}
                            variant="outline"
                            className="gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export Laporan
                        </Button>
                    </div>
                )}

                {!report && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                        <p className="text-gray-600">
                            Pilih tanggal dan klik "Buat Laporan" untuk melihat hasil laporan
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
