import MainLayout from '@/components/fragments/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { Link } from '@inertiajs/react';

const Login = () => {
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
                    <form className="flex h-[65vh] w-md flex-col items-start justify-center gap-6 rounded-r-2xl bg-white p-10">
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
                                    <Input
                                        type="email"
                                        placeholder="Contoh@gmail.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="Masukan passwordmu di sini"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-4">
                                <Button type='submit' size={'lg'}>Masuk</Button>
                                <p className="w-full text-center text-xs">
                                    Belum punya akun?{' '}
                                    <Link
                                        href={register()}
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
