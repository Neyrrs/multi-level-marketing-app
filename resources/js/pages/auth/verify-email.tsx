// Components
import MainLayout from '@/components/fragments/main-layout';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head, Link } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <MainLayout showFooter={false} showNavbar={false}>
            <Head title="Verifikasi Email" />

            <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
                <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-2xl bg-white p-10 shadow-lg border">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-3xl font-bold text-primary">
                            Verifikasi Email
                        </h1>
                        <p className="text-sm opacity-80 mt-2">
                            Silakan verifikasi alamat email Anda dengan mengklik
                            tautan yang baru saja kami kirimkan ke email Anda.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="w-full rounded-md bg-green-50 p-4 text-center text-sm font-medium text-green-600 border border-green-200">
                            Tautan verifikasi baru telah dikirim ke alamat email
                            yang Anda berikan saat pendaftaran.
                        </div>
                    )}

                    <Form {...send.form()} className="w-full space-y-6 text-center">
                        {({ processing }) => (
                            <div className="flex flex-col gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full font-bold bg-primary hover:bg-primary/90"
                                >
                                    {processing && <Spinner className="mr-2" />}
                                    Kirim Ulang Email Verifikasi
                                </Button>

                                <Link
                                    href={logout()}
                                    as="button"
                                    method="post"
                                    className="text-sm font-medium text-gray-500 hover:text-gray-900 mx-auto block"
                                >
                                    Keluar
                                </Link>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </MainLayout>
    );
}
