import MainLayout from '@/components/fragments/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register as registerPage } from '@/routes';
import { LoginSchema, loginSchema } from '@/schemas/login-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

    const handleSubmitLogin = (data: LoginSchema) => {};

    return (
        <MainLayout showFooter={false} showNavbar={false}>
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="flex h-fit w-fit shadow-md">
                    <div className="h-[65vh] w-md">
                        <img
                            src="#"
                            alt="ini adalah foto navbar"
                            className="h-full w-full rounded-l-2xl border-2 object-cover"
                        />
                    </div>
                    <form
                        onSubmit={handleSubmit(handleSubmitLogin)}
                        className="flex h-[65vh] w-md flex-col items-start justify-center gap-6 rounded-r-2xl bg-white p-10"
                    >
                        <div className="flex flex-col gap-2">
                            <p className="text-4xl font-bold text-primary">
                                Masuk
                            </p>
                            <p className="text-xs opacity-80">
                                Silahkan masukan akun anda yang sudah
                                terdaftar.Silahkan masukan akun anda yang sudah
                                terdaftar.
                            </p>
                        </div>
                        <div className="flex w-full flex-col gap-10">
                            <div className="flex flex-col gap-4">
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
                            </div>
                            <div className="flex w-full flex-col gap-4">
                                <Button type="submit" size={'lg'}>
                                    Masuk
                                </Button>
                                <p className="w-full text-center text-xs">
                                    Belum punya akun?{' '}
                                    <Link
                                        href={registerPage()}
                                        className="font-bold text-primary"
                                    >
                                        {' '}
                                        Daftar Sekarang
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

export default Login;
