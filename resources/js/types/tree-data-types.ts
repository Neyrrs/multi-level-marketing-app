export interface IBranchPerson {
    nickname: string;
    username: string;
    profileImage: string;
    rewardPoint: {
        leftSide: number;
        rightSide: number;
    };
    couplePoint: {
        leftSide: number;
        rightSide: number;
    };
    children?: IBranchPerson[]
}