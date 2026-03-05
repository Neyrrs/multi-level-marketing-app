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
import { useForm } from 'react-hook-form';

const EditProfile = () => {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    console.log(user);

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

    const handleEditProfile = (data: EditProfileSchema) => {
        router.put('/profile', data, {
            preserveScroll: true,
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
                                <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-primary">
                                    <img
                                        src={''}
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
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <div>
                                        <Label>Username</Label>
                                        <Input {...register('name')} />
                                        {errors.name && (
                                            <p className="text-xs text-red-500">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Nomor Telepon</Label>
                                        <Input {...register('phone')} />
                                        {errors.phone && (
                                            <p className="text-xs text-red-500">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input {...register('email')} />
                                        {errors.email && (
                                            <p className="text-xs text-red-500">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:w-full">
                                    <Label>Alamat</Label>
                                    <textarea
                                        {...register('alamat')}
                                        className="mt-1 min-h-40 w-full resize-none rounded-md border-3 border-primary px-3 py-3 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
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
