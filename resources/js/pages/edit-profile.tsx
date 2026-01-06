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
import {
    editProfileSchema,
    EditProfileSchema,
} from '@/schemas/edit-profil-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

const EditProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
    });

    const handleEditProfile = (data: EditProfileSchema) => {
        console.log(data);
    };
    return (
        <MainLayout>
            <form
                onSubmit={handleSubmit(handleEditProfile)}
                className="pt-5 pb-16"
            >
                <ContainerWrapper>
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        href="/profile"
                                        className="text-base font-medium"
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
                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4">
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

                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-8">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-primary">
                                    Informasi Personal
                                </h2>
                                <div className="mt-2 h-px w-full bg-black" />
                            </div>

                            <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-12">
                                <div>
                                    <Label>Nama Lengkap</Label>
                                    <div>
                                        <Input
                                            {...register('nama_lengkap')}
                                            defaultValue="John Doe Ronaldodinho"
                                        />
                                        {errors.nama_lengkap && (
                                            <p className="text-xs text-red-500">
                                                {errors.nama_lengkap.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label>Username</Label>
                                    <div>
                                        <Input
                                            placeholder="Username"
                                            {...register('username')}
                                            defaultValue="John Doe"
                                        />
                                        {errors.username && (
                                            <p className="text-xs text-red-500">
                                                {errors.username.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label>Nomor Telepon</Label>
                                    <div>
                                        <Input
                                            inputMode='numeric'
                                            placeholder="Nomor telepon"
                                            {...register('nomor_telepon')}
                                            defaultValue="(+62) 8987360972"
                                        />
                                        {errors.nomor_telepon && (
                                            <p className="text-xs text-red-500">
                                                {errors.nomor_telepon.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label>Jenis Kelamin</Label>
                                    <div>
                                        <Input
                                            placeholder="Jenis kelamain"
                                            {...register('jenis_kelamin')}
                                            defaultValue="Pria"
                                        />
                                        {errors.jenis_kelamin && (
                                            <p className="text-xs text-red-500">
                                                {errors.jenis_kelamin.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <div>
                                        <Input
                                            placeholder="Email"
                                            {...register('email')}
                                            defaultValue="example@gmail.com"
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-red-500">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label>Kartu Rekening</Label>
                                    <div>
                                        <Input
                                            placeholder="Kartu rekening"
                                            {...register('rekening')}
                                            defaultValue="BCA"
                                        />
                                        {errors.rekening && (
                                            <p className="text-xs text-red-500">
                                                {errors.rekening.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label>No. Rekening</Label>
                                    <div>
                                        <Input
                                            inputMode='numeric'
                                            placeholder="Nomor rekening"
                                            {...register('nomor_rekening')}
                                            defaultValue={89878987987}
                                        />
                                        {errors.nomor_rekening && (
                                            <p className="text-xs text-red-500">
                                                {errors.nomor_rekening.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:col-span-4">
                                    <Label>Alamat</Label>
                                    <div>
                                        <textarea
                                            placeholder="Alamat lengkap"
                                            {...register('alamat')}
                                            className="mt-1 min-h-40 w-full resize-none rounded-md border-3 border-primary px-3 py-3 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
                                            defaultValue="Donec imperdiet euismod finibus. Sed eu nibh aliquet, ultrices erat a, fermentum leo. Duis purus turpis, scelerisque id nisl eget, aliquet porta ipsum. Vestibulum tortor enim, interdum ac cursus ut, egestas eget velit. Sed leo odio, viverra ac nibh quis, auctor egestas lacus. Vivamus vitae orci luctus, maximus nisi et, volutpat elit. Donec id fringilla lectus"
                                        />
                                        {errors.alamat && (
                                            <p className="text-xs text-red-500">
                                                {errors.alamat.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-4">
                        <Button
                            type="reset"
                            variant="outline"
                            className="border-red-500 font-bold text-red-500 hover:text-red-500"
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-600 font-bold hover:bg-green-700"
                        >
                            Simpan
                        </Button>
                    </div>
                </ContainerWrapper>
            </form>
        </MainLayout>
    );
};

export default EditProfile;
