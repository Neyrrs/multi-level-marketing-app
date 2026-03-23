import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Pengaturan', href: '/affiliate/pengaturan' }];

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        phone?: string | null;
    };
    bankAccounts: Array<{
        id: number;
        bank_name: string;
        bank_code: string;
        account_number: string;
        account_holder: string;
        is_primary: boolean;
    }>;
    bankOptions: Array<{
        name: string;
        code: string;
    }>;
    wallet: {
        available_balance: number;
    };
    withdrawals: Array<{
        id: number;
        withdrawal_number: string;
        destination_bank: string | null;
        destination_account: string | null;
        destination_name: string | null;
        amount: number;
        fee: number;
        net_amount: number;
        status: string;
        created_at: string | null;
    }>;
}

export default function Pengaturan({ user, bankAccounts = [], bankOptions = [], wallet, withdrawals = [] }: Props) {
    const bankForm = useForm({
        bank_name: bankOptions[0]?.name ?? 'BCA',
        account_number: '',
        account_holder: user?.name ?? '',
    });

    const withdrawForm = useForm({
        bank_account_id: bankAccounts[0]?.id ? String(bankAccounts[0].id) : '',
        amount: '',
        notes: '',
    });

    const submitBank = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        bankForm.post('/affiliate/pengaturan/bank-account', {
            preserveScroll: true,
            onSuccess: () => bankForm.reset('account_number'),
        });
    };

    const submitWithdraw = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        withdrawForm.post('/affiliate/pengaturan/withdraw', {
            preserveScroll: true,
            onSuccess: () => withdrawForm.reset('amount', 'notes'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Affiliate" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="text-lg font-semibold">Saldo Komisi</h3>
                    <p className="mt-2 text-2xl font-bold">
                        Rp {Number(wallet?.available_balance ?? 0).toLocaleString('id-ID')}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Saldo tersedia untuk diajukan pencairan</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold">Rekening Penarikan</h3>
                        <form onSubmit={submitBank} className="space-y-3">
                            <div className="grid gap-2">
                                <Label htmlFor="bank_name">Bank</Label>
                                <select
                                    id="bank_name"
                                    value={bankForm.data.bank_name}
                                    onChange={(e) => bankForm.setData('bank_name', e.target.value)}
                                    className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                                >
                                    {bankOptions.map((bank) => (
                                        <option key={bank.code} value={bank.name}>
                                            {bank.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="account_number">Nomor Rekening</Label>
                                <Input
                                    id="account_number"
                                    value={bankForm.data.account_number}
                                    onChange={(e) => bankForm.setData('account_number', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="account_holder">Nama Pemilik</Label>
                                <Input
                                    id="account_holder"
                                    value={bankForm.data.account_holder}
                                    onChange={(e) => bankForm.setData('account_holder', e.target.value)}
                                    required
                                />
                            </div>
                            {(bankForm.errors.bank_name || bankForm.errors.account_number || bankForm.errors.account_holder) && (
                                <p className="text-sm text-red-600">
                                    {bankForm.errors.bank_name || bankForm.errors.account_number || bankForm.errors.account_holder}
                                </p>
                            )}
                            <Button type="submit" disabled={bankForm.processing}>
                                {bankForm.processing ? 'Menyimpan...' : 'Simpan Rekening'}
                            </Button>
                        </form>
                    </div>

                    <div className="rounded-xl border bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold">Ajukan Withdrawal</h3>
                        <form onSubmit={submitWithdraw} className="space-y-3">
                            <div className="grid gap-2">
                                <Label htmlFor="bank_account_id">Rekening Tujuan</Label>
                                <select
                                    id="bank_account_id"
                                    value={withdrawForm.data.bank_account_id}
                                    onChange={(e) => withdrawForm.setData('bank_account_id', e.target.value)}
                                    className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                                    required
                                >
                                    <option value="">Pilih rekening</option>
                                    {bankAccounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.bank_name} - {account.account_number} ({account.account_holder})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Nominal</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    min={10000}
                                    step="1000"
                                    value={withdrawForm.data.amount}
                                    onChange={(e) => withdrawForm.setData('amount', e.target.value)}
                                    required
                                />
                                <p className="text-xs text-gray-500">Minimal Rp 10.000</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Catatan (opsional)</Label>
                                <Input
                                    id="notes"
                                    value={withdrawForm.data.notes}
                                    onChange={(e) => withdrawForm.setData('notes', e.target.value)}
                                />
                            </div>
                            {(withdrawForm.errors.withdraw || withdrawForm.errors.bank_account_id || withdrawForm.errors.amount) && (
                                <p className="text-sm text-red-600">
                                    {withdrawForm.errors.withdraw || withdrawForm.errors.bank_account_id || withdrawForm.errors.amount}
                                </p>
                            )}
                            <Button type="submit" disabled={withdrawForm.processing || bankAccounts.length === 0}>
                                {withdrawForm.processing ? 'Mengirim...' : 'Ajukan Pencairan'}
                            </Button>
                            {bankAccounts.length === 0 && (
                                <p className="text-xs text-amber-600">Simpan rekening dulu sebelum ajukan withdrawal.</p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-6">
                    <h3 className="mb-4 text-lg font-semibold">Riwayat Withdrawal</h3>
                    {withdrawals.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>No. WD</TableHead>
                                    <TableHead>Bank</TableHead>
                                    <TableHead>Nominal</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {withdrawals.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.withdrawal_number}</TableCell>
                                        <TableCell>{item.destination_bank ?? '-'}</TableCell>
                                        <TableCell>Rp {Number(item.net_amount).toLocaleString('id-ID')}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="py-8 text-center text-gray-500">Belum ada riwayat withdrawal</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
