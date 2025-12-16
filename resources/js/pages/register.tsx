import MainLayout from '@/components/fragments/main-layout';
import { Button } from '@/components/ui/button';
import Combobox from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { registerSchema, RegisterSchema } from '@/schemas/register-validation';
import { IRegisterInput } from '@/types/input-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

    const handleSubmitRegister = (data: IRegisterInput) => {
        console.log(data);
    };

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
                    <form
                        onSubmit={handleSubmit(handleSubmitRegister)}
                        className="flex min-h-[65vh] w-md flex-col items-start justify-center gap-6 rounded-r-2xl bg-white p-10"
                    >
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
                                    <div>
                                        <Input
                                            {...register('nama_lengkap')}
                                            type="text"
                                            placeholder="Nama lengkap"
                                        />
                                        {errors.nama_lengkap && (
                                            <p className="text-xs text-red-500">
                                                {errors.nama_lengkap.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Username</Label>
                                    <div>
                                        <Input
                                            {...register('username')}
                                            type="text"
                                            placeholder="Username"
                                        />
                                        {errors.username && (
                                            <p className="text-xs text-red-500">
                                                {errors.username.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Email</Label>
                                    <div>
                                        <Input
                                            {...register('email')}
                                            type="email"
                                            placeholder="Contoh@gmail.com"
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-red-500">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Password</Label>
                                    <div>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...register('password')}
                                                placeholder="Masukan passwordmu di sini"
                                            />

                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
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
                                        {errors.password && (
                                            <p className="text-xs text-red-500">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Jenis Kelamin</Label>
                                    <Combobox />
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-4">
                                <Button type="submit" size={'lg'}>
                                    Masuk
                                </Button>
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
