import MainLayout from '@/components/fragments/main-layout';
import { Button } from '@/components/ui/button';
import Combobox from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { Link } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <MainLayout showFooter={false} showNavbar={false}>
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="flex h-fit w-fit shadow-md">
                    <div className="min-h-[65vh] w-md">
                        <img
                            src="#"
                            alt="ini adalah foto navbar"
                            className="h-full w-full rounded-l-2xl border-2 object-cover"
                        />
                    </div>
                    <form className="flex min-h-[65vh] w-md flex-col items-start justify-center gap-6 rounded-r-2xl bg-white p-10">
                        <div className="flex flex-col gap-2">
                            <p className="text-4xl font-bold text-primary">
                                Daftar
                            </p>
                            <p className="text-xs opacity-80">
                                Silahkan isi data berikut dengan lengkap dan
                                sesuai
                            </p>
                        </div>
                        <div className="flex w-full flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label>Nama Lengkap</Label>
                                    <Input
                                        type="text"
                                        placeholder="Nama lengkap"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Username</Label>
                                    <Input type="text" placeholder="Username" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="Contoh@gmail.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Password</Label>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Masukan passwordmu di sini"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute top-1/2 right-1 -translate-y-1/2 bg-transparent text-primary hover:bg-transparent"
                                        >
                                            {showPassword ? (
                                                <EyeClosed />
                                            ) : (
                                                <Eye />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Jenis Kelamin</Label>
                                    <Combobox />
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-4">
                                <Button type='submit' size={'lg'}>Masuk</Button>
                                <p className="w-full text-center text-xs">
                                    Sudah punya akun?
                                    <Link
                                        href={login()}
                                        className="font-bold text-primary"
                                    >
                                        {' '}
                                        Masuk
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default Register;
