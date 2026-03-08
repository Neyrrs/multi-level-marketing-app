import MainLayout from '@/components/fragments/main-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { login } from '@/routes';
import { store } from '@/routes/register';
import { Combobox } from '@headlessui/react';

import { Form, Head, Link } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <MainLayout showFooter={false} showNavbar={false}>
            <Head title="Register" />

            <div className="flex h-screen w-screen items-center justify-center">
                <div className="flex h-fit w-fit shadow-md">
                    {/* IMAGE */}
                    <div className="min-h-[65vh] w-md overflow-hidden rounded-l-2xl border-2">
                        <img
                            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
                            alt="Register Office View"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* FORM */}
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex min-h-[65vh] w-md flex-col justify-center gap-6 rounded-r-2xl bg-white p-10"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* TITLE */}
                                <div className="flex flex-col gap-2">
                                    <p className="text-4xl font-bold text-primary">
                                        Daftar
                                    </p>
                                    <p className="text-xs opacity-80">
                                        Silahkan isi email dan password Anda untuk mendaftar
                                    </p>
                                </div>

                                {/* INPUT */}
                                <div className="flex flex-col gap-4">
                                    {/* EMAIL */}
                                    <div className="flex flex-col gap-2">
                                        <Label>Email</Label>
                                        <Input
                                            name="email"
                                            type="email"
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
                                                name="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Masukan password"
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

                                    {/* CONFIRM PASSWORD */}
                                    <div className="flex flex-col gap-2">
                                        <Label>Konfirmasi Password</Label>
                                        <Input
                                            name="password_confirmation"
                                            type="password"
                                            placeholder="Ulangi password"
                                            required
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
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
                                        Daftar
                                    </Button>

                                    <p className="text-center text-xs">
                                        Sudah punya akun?{' '}
                                        <Link
                                            href={login.url()}
                                            className="font-bold text-primary"
                                        >
                                            Masuk
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

export default Register;
