import { Button } from '../ui/button';
import ContainerWrapper from './container-wrapper';

const JoinCard = () => {
    return (
        <div className="relative h-full w-full">
            <div className="absolute -top-30 flex h-60 w-full justify-center">
                <div className="relative flex h-full w-5xl items-center justify-between rounded-xl border-8 border-background bg-secondary px-14">
                    <div className="flex w-full flex-col gap-2 text-white">
                        <h1 className="flex items-center gap-4 font-poppins text-3xl font-semibold">
                            Bergabung bersama kami
                        </h1>
                        <p className="w-2/3 opacity-70">
                            eget pharetra magna aliquet id. Suspendisse ac
                            commodo massa
                        </p>
                    </div>
                    <Button
                        className="rounded-sm bg-white px-10 py-1 text-lg font-bold text-primary hover:bg-white/90 hover:text-primary/90"
                        size={'lg'}
                    >
                        Gabung
                    </Button>
                    <div className="absolute top-0 right-0 flex h-12 w-50 items-center gap-2 rounded-bl-xl bg-background px-6">
                        <div className="h-8 w-8">
                            <img
                                src=""
                                alt="ini adalah profil"
                                className="h-full w-full rounded-full border"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[14px] font-bold text-primary">
                                John Doe
                            </h1>
                            <p className="text-xs">Username</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TopReviews = () => {
    return (
        <div className="relative mt-20 flex h-40 w-full flex-col bg-secondary">
            <ContainerWrapper>
                <JoinCard />
            </ContainerWrapper>
            <div className="flex flex-col items-center justify-center bg-secondary py-50">
                <h1 className="w-full text-center font-poppins text-4xl font-bold text-white">
                    Apa Kata Orang-Orang
                </h1>
                <p className="w-full text-center font-poppins text-sm font-medium text-white/80">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit. lorem5
                </p>
            </div>
        </div>
    );
};

export default TopReviews;
