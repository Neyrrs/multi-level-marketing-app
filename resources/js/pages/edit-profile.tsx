import ContainerWrapper from '@/components/fragments/container-wrapper';
import MainLayout from '@/components/fragments/main-layout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';

const EditProfile = () => {
    return (
        <MainLayout>
            <div className="pt-15 pb-16">
                <ContainerWrapper>
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        href="/profile"
                                        className="text-base font-bold"
                                    >
                                        Profile
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-base font-bold text-primary">
                                    Edit Profile
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                        <div className="rounded-3xl bg-white p-8 shadow-lg lg:col-span-4">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-primary">
                                    Foto Profil
                                </h2>
                                <div className="mt-2 h-px w-full bg-black" />
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-primary">
                                    <img
                                        src=""
                                        alt="Foto Profil"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    Tekan untuk mengubah
                                </p>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-lg lg:col-span-8">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-primary">
                                    Informasi Personal
                                </h2>
                                <div className="mt-2 h-px w-full bg-black" />
                            </div>

                            <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-12">
                                <div>
                                    <Label>Nama Lengkap</Label>
                                    <Input defaultValue="John Doe Ronaldodinho" />
                                </div>
                                <div>
                                    <Label>Username</Label>
                                    <Input defaultValue="John Doe" />
                                </div>
                                <div>
                                    <Label>Nomor Telepon</Label>
                                    <Input defaultValue="(+62) 8987360972" />
                                </div>
                                <div>
                                    <Label>Jenis Kelamin</Label>
                                    <Input defaultValue="Pria" />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input defaultValue="example@gmail.com" />
                                </div>
                                <div>
                                    <Label>Kartu Rekening</Label>
                                    <Input defaultValue="BCA" />
                                </div>
                                <div>
                                    <Label>No. Rekening</Label>
                                    <Input defaultValue="0089878987987" />
                                </div>
                                <div className="md:col-span-4">
                                    <Label>Alamat</Label>
                                    <textarea
                                        className="mt-1 min-h-[160px] w-full resize-none rounded-md border-2 border-primary px-3 py-3 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
                                        defaultValue="Donec imperdiet euismod finibus. Sed eu nibh aliquet, ultrices erat a, fermentum leo. Duis purus turpis, scelerisque id nisl eget, aliquet porta ipsum. Vestibulum tortor enim, interdum ac cursus ut, egestas eget velit. Sed leo odio, viverra ac nibh quis, auctor egestas lacus. Vivamus vitae orci luctus, maximus nisi et, volutpat elit. Donec id fringilla lectus"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-4">
                        <Button
                            variant="outline"
                            className="border-red-500 text-red-500"
                        >
                            Reset
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700">
                            Simpan
                        </Button>
                    </div>
                </ContainerWrapper>
            </div>
        </MainLayout>
    );
};

export default EditProfile;
