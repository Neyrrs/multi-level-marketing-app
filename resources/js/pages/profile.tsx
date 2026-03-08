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
import { Label } from '@/components/ui/label';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

interface IActivationCode {
    activation_code: string;
}
const Profile = () => {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    return (
        <MainLayout showNavbar showFooter>
            <div className="py-10">
                <ContainerWrapper>
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        href="/dashboard"
                                        className="text-base font-medium"
                                    >
                                        Dasbor
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-base font-bold text-primary">
                                    Profile
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="mb-6 flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-primary">
                            Profilku
                        </h1>
                        <div className="flex-1 border-t border-black" />
                    </div>

                    <div className="mb-10 flex items-center gap-8 rounded-3xl bg-white p-8 shadow-lg">
                        <img
                            src={user.avatar}
                            alt="Foto Profil"
                            className="h-24 w-24 rounded-full border-3 border-primary object-cover"
                        />
                        <div className="flex flex-col">
                            <p className="text-lg font-bold text-primary">
                                {user.name || '-'}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {user.roles.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="mt-2 w-fit rounded-full bg-primary px-3 py-1 text-xs text-white"
                                    >
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-10 rounded-3xl bg-white p-8 shadow-lg">
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-primary">
                                    Informasi Personal
                                </h2>

                                <Button size="sm" asChild>
                                    <Link href="/edit-profile">Edit</Link>
                                </Button>
                            </div>
                            <div className="mt-3 h-px w-full bg-black" />
                        </div>

                        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-12">
                            <div>
                                <Label className="font-bold text-primary">
                                    Username
                                </Label>
                                <p className="truncate text-sm">
                                    {user.name || '-'}
                                </p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Nomor Telepon
                                </Label>
                                <p className="truncate text-sm">
                                    {user.phone || '-'}
                                </p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Email
                                </Label>
                                <p className="truncate text-sm">
                                    {user.email || '-'}
                                </p>
                            </div>

                            <div>
                                <Label className="font-bold text-primary">
                                    Alamat
                                </Label>
                                <p className="wrap-break-words max-w-xs text-sm leading-relaxed whitespace-normal opacity-80">
                                    {user.alamat || '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                </ContainerWrapper>
            </div>
        </MainLayout>
    );
};

export default Profile;
