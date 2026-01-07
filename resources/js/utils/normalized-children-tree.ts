import { IBranchPerson } from '@/types/tree-data-types';

const createEmptyPerson = (): IBranchPerson => ({
    nickname: '',
    username: '',
    profileImage: '/images/profile/empty.png',
    rewardPoint: { leftSide: 0, rightSide: 0 },
    couplePoint: { leftSide: 0, rightSide: 0 },
});

export const normalizeChildren = (
    children: IBranchPerson[] | undefined,
    totalSlot: number,
): IBranchPerson[] => {
    const filled = children ?? [];
    const emptyCount = Math.max(totalSlot - filled.length, 0);

    return [
        ...filled,
        ...Array.from({ length: emptyCount }, createEmptyPerson),
    ];
};
