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
import { SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const EditProfile = () => {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '-',
            alamat: user.alamat || '-',
        },
    });

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleEditProfile = (data: EditProfileSchema) => {
        router.post('/profile', {
            ...data,
            phone: data.phone || '',
            alamat: data.alamat || '',
            photo: photo,
        }, {
            preserveScroll: true,
            forceFormData: true,
        });
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
                                <Label
                                    htmlFor="photo-upload"
                                    className="cursor-pointer group flex flex-col items-center gap-4"
                                >
                                    <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-primary relative">
                                        <img
                                            src={photoPreview || user.avatar}
                                            alt="Foto Profil"
                                            className="h-full w-full object-cover transition duration-300 group-hover:opacity-75"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-xs font-semibold">Ubah Foto</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Tekan untuk mengubah (Max 4MB)
                                    </p>
                                </Label>
                                <Input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoChange}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-8">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-8">
                                    <div className="flex-1">
                                        <Label>Username</Label>
                                        <Input {...register('name')} />
                                        {errors.name && (
                                            <p className="text-xs text-red-500 mt-1">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <Label>Nomor Telepon</Label>
                                        <Input {...register('phone')} />
                                        {errors.phone && (
                                            <p className="text-xs text-red-500 mt-1">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <Label>Email</Label>
                                        <Input {...register('email')} />
                                        {errors.email && (
                                            <p className="text-xs text-red-500 mt-1">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full mt-4">
                                    <Label>Alamat</Label>
                                    <textarea
                                        {...register('alamat')}
                                        className="mt-1 min-h-40 w-full resize-none rounded-md border-2 border-primary/20 px-3 py-3 text-sm focus:ring-2 focus:border-primary focus:ring-primary/50 focus:outline-none transition"
                                    />
                                    {errors.alamat && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.alamat.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        <Link href="/profile">
                            <Button
                                type="button"
                                variant="outline"
                                className="font-bold text-gray-500 hover:text-gray-700"
                            >
                                Kembali
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            className="bg-green-600 font-bold hover:bg-green-700"
                        >
                            Simpan Perubahan
                        </Button>
                    </div>
                </ContainerWrapper>
            </form>
        </MainLayout>
    );
};

export default EditProfile;
