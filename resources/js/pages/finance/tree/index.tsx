import { CreateBranchPerson } from '@/components/fragments/dialog-contents/create-branch-person';
import { CreateBranchPersonDialog } from '@/components/fragments/dialog-modal-create-branch-person';
import { Badge } from '@/components/ui/badge';
import { branchPersonDummy } from '@/data/tree-data';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { IBranchPerson } from '@/types/tree-data-types';
import { normalizeChildren } from '@/utils/normalized-children-tree';
import { Head } from '@inertiajs/react';
import { Gift, Handshake, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pohon Mitra',
        href: dashboard().url,
    },
];

export default function TreePage() {
    const level2Children = normalizeChildren(branchPersonDummy.children, 2);

    const level3Children = level2Children.flatMap((child) =>
        normalizeChildren(child.children, 2),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pohon Mtra" />
            <div className="flex h-fit w-full flex-col px-5">
                <div className="flex min-h-screen w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 md:px-5">
                    <div>
                        <p className="text-lg font-bold text-primary md:text-2xl">
                            Diagram Pohon Mitra
                        </p>
                        <p className="text-xs md:text-sm">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Possimus, quo. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Impedit Lorem ipsum
                            dolor sit amet consectetur adipisicing elit.
                            Perspiciatis dolores at, dolorem magni perferendis
                            reprehenderit qui. Ducimus sapiente voluptates quia?
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                        <Badge className="flex items-center gap-2 text-xs font-semibold md:px-4 md:py-1 md:text-sm md:font-bold">
                            <Plus />
                            Mendaftarkan mitra baru
                        </Badge>
                        <Badge className="flex items-center gap-2 bg-red-500 text-xs font-semibold md:px-4 md:py-1 md:text-sm md:font-bold">
                            <Handshake />
                            PS (Poin Pasangan)
                        </Badge>
                        <Badge className="flex items-center gap-2 bg-yellow-400 text-xs font-semibold md:px-4 md:py-1 md:text-sm md:font-bold">
                            <Gift />
                            PR (Poin Reward)
                        </Badge>
                    </div>
                    <div className="flex h-fit w-full flex-col pt-6">
                        <div className="flex h-full w-full flex-col items-center justify-center">
                            <BranchPerson {...branchPersonDummy} />
                        </div>

                        <div className="flex h-fit w-full pt-4 md:pt-8">
                            <div className="flex h-fit w-full pt-8">
                                <div className="flex w-full pt-8">
                                    {level2Children.map((child, idx) => (
                                        <div key={idx} className="w-1/2">
                                            <BranchPerson {...child} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex h-fit w-full pt-4 md:pt-8">
                            <div className="flex h-fit w-full pt-8">
                                <div className="flex w-full pt-8">
                                    {level3Children.map((grandChild, idx) => (
                                        <div key={idx} className="w-1/4">
                                            <BranchPerson {...grandChild} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

const BranchPerson = ({
    nickname = '???',
    username = 'Unknown',
    profileImage = '',
    rewardPoint = { leftSide: 0, rightSide: 0 },
    couplePoint = { leftSide: 0, rightSide: 0 },
}: IBranchPerson) => {
    const isUserAvailable = nickname.length > 0 && username.length > 0;

    return (
        <div className="flex h-fit w-full flex-col items-center justify-center">
            {isUserAvailable ? (
                <img
                    src={isUserAvailable ? profileImage : ''}
                    className="size-15 rounded-full border-3 border-primary md:size-30"
                    alt={nickname}
                />
            ) : (
                <CreateBranchPersonDialog>
                    <CreateBranchPerson />
                </CreateBranchPersonDialog>
            )}
            <div className="flex flex-col items-center pt-2 pb-1">
                <p className="text-xs md:text-sm">{nickname}</p>
                <p className="md:text-normal text-sm font-bold text-primary">
                    {username}
                </p>
            </div>
            <div className="flex flex-col items-center text-xs md:text-sm">
                <p className="flex gap-2 font-bold text-red-500">
                    <span>{couplePoint.leftSide}</span>
                    PS
                    <span>{couplePoint.rightSide}</span>
                </p>
                <p className="flex gap-2 font-bold text-yellow-400">
                    <span>{rewardPoint.leftSide}</span>
                    PR
                    <span>{rewardPoint.rightSide}</span>
                </p>
            </div>
        </div>
    );
};
