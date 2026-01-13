import { Spinner } from '@/components/ui/spinner';
import { useForm } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { DynamicCombobox } from '../../ui/combobox';
import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

export const CreateBranchPerson = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { data, setData, errors, processing } = useForm({
        pin_id: null,
        sponsor_name: '',
        username: '',
        password: '',
        email: '',
        gender: '',
    });

    const genders = [
        { id: 'L', label: 'Laki-laki' },
        { id: 'P', label: 'Perempuan' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // post(route('branch-person.store'));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
                <DialogTitle>Formulir Pendaftaran Affiliator</DialogTitle>
                <DialogDescription>
                    Tambahkan akun affiliator dengan mengisi formulir di bawah ini
                </DialogDescription>
            </DialogHeader>
            <div className="grid max-h-[40vh] gap-4 overflow-scroll md:max-h-full md:overflow-hidden">
                <div className="grid gap-3">
                    <Label htmlFor="name-1">Pilih PIN</Label>
                    <DynamicCombobox
                        dataType="PIN"
                        options={genders}
                        value={data.gender}
                        onChange={(value: string | number) =>
                            setData('gender', value as string)
                        }
                        getLabel={(item) => item.label}
                        getValue={(item) => item.id}
                        placeholder="Pilih PIN"
                        error={errors.gender}
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="sponsor-owner">Pemilik Sponsor</Label>
                    <Input
                        readOnly
                        id="sponsor-owner"
                        value={data.sponsor_name}
                        onChange={(e) =>
                            setData('sponsor_name', e.target.value)
                        }
                        name="sponsor-owner"
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        placeholder="Masukan username"
                        name="username"
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Masukan password"
                            required
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-transparent text-primary hover:bg-transparent"
                        >
                            {showPassword ? <EyeClosed /> : <Eye />}
                        </Button>
                    </div>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        value={data.email}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        id="email"
                        name="email"
                        placeholder="Masukan email"
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="jenis-kelamin">Jenis Kelamin</Label>
                    <DynamicCombobox
                        options={genders}
                        value={data.gender}
                        dataType="Jenis Kelamin"
                        onChange={(value: string | number) =>
                            setData('gender', value as string)
                        }
                        getLabel={(item) => item.label}
                        getValue={(item) => item.id}
                        placeholder="Pilih Jenis Kelamin"
                        error={errors.gender}
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" size="lg" disabled={processing}>
                    {processing && <Spinner className="mr-2" />}
                    Tambah Affiliator
                </Button>
            </DialogFooter>
        </form>
    );
};
