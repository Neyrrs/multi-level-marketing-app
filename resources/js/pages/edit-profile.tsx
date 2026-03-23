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
import { Textarea } from '@/components/ui/textarea';
import {
    editProfileSchema,
    EditProfileSchema,
} from '@/schemas/edit-profil-validation';
import { SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const EditProfile = () => {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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
            phone: user.phone || '',
            alamat: user.alamat || '',
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
        try {
            setLoading(true);
            router.post(
                '/profile',
                {
                    ...data,
                    phone: data.phone || '',
                    alamat: data.alamat || '',
                    photo: photo,
                },
                {
                    preserveScroll: true,
                    forceFormData: true,
                },
            );
        } catch (error) {
            toast.error('Gagal mengubah profile');
        } finally {
            setLoading(false);
        }
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
                                    className="group flex cursor-pointer flex-col items-center gap-4"
                                >
                                    <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary">
                                        <img
                                            src={photoPreview || user.avatar}
                                            alt="Foto Profil"
                                            className="h-full w-full object-cover transition duration-300 group-hover:opacity-75"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="text-xs font-semibold text-white">
                                                Ubah Foto
                                            </span>
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
                                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-8">
                                    <div className="flex-1">
                                        <Label>Username</Label>
                                        <Input {...register('name')} />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <Label>Nomor Telepon</Label>
                                        <Input {...register('phone')} />
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <Label>Email</Label>
                                        <Input {...register('email')} />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 w-full">
                                    <Label>Alamat</Label>
                                    <Textarea
                                        {...register('alamat')}
                                        className="mt-1 min-h-40 resize-none text-xs"
                                    />
                                    {errors.alamat && (
                                        <p className="mt-1 text-xs text-red-500">
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
                            className="bg-primary font-bold hover:bg-primary/80"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                'Simpan Perubahan'
                            )}
                        </Button>
                    </div>
                </ContainerWrapper>
            </form>
        </MainLayout>
    );
};

export default EditProfile;
