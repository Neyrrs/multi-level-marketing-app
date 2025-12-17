import ContainerWrapper from '@/components/fragments/container-wrapper';
import MainLayout from '@/components/fragments/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { editProfile } from '@/routes';
import { Link } from '@inertiajs/react';

const Profile = () => {
    return (
        <MainLayout showNavbar showFooter>
            <div className="py-16">
                <ContainerWrapper>
                    <div className="mb-6 flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-primary">
                            Profilku
                        </h1>
                        <div className="flex-1 border-t border-black" />
                    </div>

                    <div className="mb-10 flex items-center gap-8 rounded-3xl bg-white p-8 shadow-lg">
                        <img
                            src=""
                            alt="Foto Profil"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <p className="text-lg font-bold text-primary">
                                John Doe
                            </p>
                            <p className="text-sm opacity-70">
                                John Doe Ronaldodinho
                            </p>
                            <span className="mt-2 w-fit rounded-full bg-primary px-3 py-1 text-xs text-white">
                                Pembeli
                            </span>
                        </div>
                    </div>

                    <div className="mb-10 rounded-3xl bg-white p-8 shadow-lg">
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-primary">
                                    Informasi Personal
                                </h2>

                                <Button size="sm" asChild>
                                    <Link href={editProfile()}>Edit</Link>
                                </Button>
                            </div>
                            <div className="mt-3 h-px w-full bg-black" />
                        </div>

                        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-12">
                            <div>
                                <Label className="font-bold text-primary">
                                    Nama Lengkap
                                </Label>
                                <p className="truncate text-sm">
                                    John Doe Ronaldodinho
                                </p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Username
                                </Label>
                                <p className="truncate text-sm">johndoe</p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Nomor Telepon
                                </Label>
                                <p className="truncate text-sm">
                                    (+62) 8987360972
                                </p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Email
                                </Label>
                                <p className="truncate text-sm">
                                    example@gmail.com
                                </p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Alamat
                                </Label>
                                <p className="max-w-xs text-sm leading-relaxed break-words whitespace-normal opacity-80">
                                    Suspendisse pharetra accumsan venenatis. Sed
                                    consectetur non libero in
                                </p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Jenis Kelamin
                                </Label>
                                <p className="truncate text-sm">Pria</p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Kartu Rekening
                                </Label>
                                <p className="truncate text-sm">BCA</p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    No. Rekening
                                </Label>
                                <p className="truncate text-sm">
                                    0089878987987
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-lg">
                        <h2 className="mb-2 text-lg font-semibold text-primary">
                            Kode Aktivasi
                        </h2>

                        <p className="mb-4 text-sm opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam risus odio, dictum id turpis vitae.
                        </p>

                        <div className="flex flex-col gap-4">
                            <Input placeholder="Masukkan kode aktivasi" />

                            <div className="flex justify-end">
                                <Button>Simpan</Button>
                            </div>
                        </div>
                    </div>
                </ContainerWrapper>
            </div>
        </MainLayout>
    );
};

export default Profile;
