import MainLayout from '@/components/fragments/main-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes/';
import { store } from '@/routes/login';
import { Form, Link, usePage } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

const Login = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <MainLayout showFooter={false} showNavbar={false}>
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="flex h-fit w-fit shadow-md">
                    {/* LEFT IMAGE */}
                    <div className="md:h-[65vh] h-fit md:block hidden w-md">
                        <img
                            src="#"
                            alt="login image"
                            className="h-full w-full rounded-l-3xl border-2 object-cover"
                        />
                    </div>

                    {/* FORM */}
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex h-fit md:py-0 py-10 md:h-[65vh] md:w-md flex-col justify-center gap-6 rounded-3xl md:rounded-r-3xl bg-white p-10"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* TITLE */}
                                <div className="flex flex-col md:items-start items-center gap-2">
                                    <p className="text-4xl font-bold text-primary">
                                        Masuk
                                    </p>
                                    <p className="text-xs opacity-80">
                                        Silahkan masukan akun anda yang sudah
                                        terdaftar.
                                    </p>
                                </div>

                                {/* INPUT */}
                                <div className="flex flex-col gap-6">
                                    {/* EMAIL */}
                                    <div className="flex flex-col gap-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Contoh@gmail.com"
                                            required
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* PASSWORD */}
                                    <div className="flex flex-col gap-2">
                                        <Label>Password</Label>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password"
                                                placeholder="Masukan passwordmu di sini"
                                                required
                                            />
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-2 -translate-y-1/2 bg-transparent text-primary hover:bg-transparent"
                                            >
                                                {showPassword ? (
                                                    <EyeClosed />
                                                ) : (
                                                    <Eye />
                                                )}
                                            </Button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>
                                </div>

                                {/* ACTION */}
                                <div className="flex flex-col gap-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <Spinner className="mr-2" />
                                        )}
                                        Masuk
                                    </Button>

                                    <p className="text-center text-xs">
                                        Belum punya akun?{' '}
                                        <Link
                                            href={register()}
                                            className="font-bold text-primary"
                                        >
                                            Daftar Sekarang
                                        </Link>
                                    </p>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </MainLayout>
    );
};

export default Login;
