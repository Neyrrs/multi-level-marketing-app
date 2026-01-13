import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HistoryIcon } from 'lucide-react';

export const HistoryModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'outline'}>
                    <HistoryIcon />
                    History
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Riwayat</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
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
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
