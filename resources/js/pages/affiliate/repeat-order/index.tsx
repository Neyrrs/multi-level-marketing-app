'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useEffect, useState } from 'react';

/* ===== MOCK DATA ===== */
const users = [
    {
        name: 'Andi Wijaya',
        city: 'Jakarta',
        phone: '08123456789',
    },
    {
        name: 'Budi Santoso',
        city: 'Bandung',
        phone: '08234567890',
    },
    {
        name: 'Budi',
        city: 'Bandung',
        phone: '08234567890',
    },
];

export default function RepeatOrder() {
    const [pin, setPin] = useState('');
    const [searchName, setSearchName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    const [error, setError] = useState('');

    useEffect(() => {
        const keyword = searchName.trim().toLowerCase();

        if (!keyword) {
            resetUser();
            return;
        }

        const user = users.find((u) => u.name.toLowerCase() === keyword);

        if (user) {
            setName(user.name);
            setCity(user.city);
            setPhone(user.phone);
            setError('');
        } else {
            resetUser();
            setError('Nama tidak ditemukan (harus nama lengkap)');
        }
    }, [searchName]);

    const resetUser = () => {
        setName('');
        setCity('');
        setPhone('');
    };

    const isValid = pin && name && password && !error;

    return (
        <AppLayout>
            <Head title="Posting RO" />

            <div className="flex w-full flex-col px-5">
                <div className="flex flex-col gap-6 rounded-xl bg-white px-4 py-8 md:px-5">
                    <div className="flex items-end justify-between border-b pb-4">
                        <div className="w-full">
                            <p className="text-lg font-bold text-primary md:text-2xl">
                                Posting RO
                            </p>
                            <span className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Modi minus minima molestiae
                                nemo, repellendus qui dignissimos nihil dolores
                                neque vitae porro maiores possimus iure, esse
                                omnis explicabo tempora itaque sunt.
                            </span>
                        </div>
                        <div className="hidden space-y-1 text-sm text-slate-600 md:block">
                            <Tooltip>
                                <TooltipTrigger>
                                    <Badge className="bg-gray-500">?</Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>1. Pilih PIN untuk RO</p>
                                    <p>2. Ketik nama lengkap mitra</p>
                                    <p>3. Pastikan data otomatis muncul</p>
                                    <p>4. Masukan password login</p>
                                    <p>5. Klik PROSES</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium">
                                Pilih PIN untuk RO
                            </Label>
                            <Select onValueChange={setPin}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih PIN" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PIN001">
                                        PIN-001
                                    </SelectItem>
                                    <SelectItem value="PIN002">
                                        PIN-002
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>
                                Tujuan <i>Repeat Order</i>
                            </Label>
                            <Input
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="Contoh: Andi Wijaya"
                                className={
                                    error
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />
                            {error && (
                                <p className="mt-1 text-xs text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>

                        <Input
                            disabled
                            value={name}
                            placeholder="Nama Lengkap"
                            className="text-slate-900"
                        />

                        <Input
                            disabled
                            value={city}
                            placeholder="Domisili"
                            className="text-slate-900"
                        />

                        <Input
                            disabled
                            value={phone}
                            placeholder="08xxxx"
                            className="text-slate-900 md:col-span-2"
                        />
                    </div>

                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <Label>Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Masukan passwordmu di sini"
                                    required
                                />
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-transparent text-primary hover:bg-transparent"
                                >
                                    {showPassword ? <EyeClosed /> : <Eye />}
                                </Button>
                            </div>
                        </div>

                        <Button
                            // disabled={!isValid}
                            variant={'default'}
                            className="disabled:opacity-50"
                        >
                            Proses Repeat Order
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
