import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useForm } from '@inertiajs/react';
import { ReactNode } from 'react';

const DialogCreateProduct = ({ children }: { children: ReactNode }) => {
    const { data, setData, errors, processing } = useForm({
        pin_id: null,
        sponsor_name: '',
        username: '',
        password: '',
        email: '',
        gender: '',
    });
    return (
        <>
            <div className="">
                <Dialog>
                    <DialogTrigger asChild>{children}</DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Buat Produk</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save
                                when you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid max-h-[40vh] gap-4 overflow-scroll md:max-h-[60vh]">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Name</Label>
                                <Input
                                    id="name-1"
                                    name="name"
                                    defaultValue="Pedro Duarte"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input
                                    id="username-1"
                                    name="username"
                                    defaultValue="@peduarte"
                                />
                            </div>{' '}
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input
                                    id="username-1"
                                    name="username"
                                    defaultValue="@peduarte"
                                />
                            </div>{' '}
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input
                                    id="username-1"
                                    name="username"
                                    defaultValue="@peduarte"
                                />
                            </div>{' '}
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input
                                    id="username-1"
                                    name="username"
                                    defaultValue="@peduarte"
                                />
                            </div>{' '}
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input
                                    id="username-1"
                                    name="username"
                                    defaultValue="@peduarte"
                                />
                            </div>{' '}
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input
                                    id="username-1"
                                    name="username"
                                    defaultValue="@peduarte"
                                />
                            </div>{' '}
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input
                                    id="username-1"
                                    name="username"
                                    defaultValue="@peduarte"
                                />
                            </div>{' '}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={processing}
                            >
                                {processing && <Spinner className="mr-2" />}
                                Tambah Produk
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default DialogCreateProduct