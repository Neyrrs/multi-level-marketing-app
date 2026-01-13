import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

export const CreateBranchPersonDialog = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <Dialog>
            <form >
                <DialogTrigger asChild>
                    <Button className="flex size-15 cursor-pointer items-center justify-center rounded-full border-3 border-secondary bg-primary text-white hover:bg-primary/95 md:size-30">
                        <Plus className="size-8 md:size-12" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    {children}
                </DialogContent>
            </form>
        </Dialog>
    );
};
