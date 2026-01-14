import { Button } from '../ui/button';
import ContainerWrapper from './container-wrapper';
import { ContainerReviewsCard } from './review-card';

const JoinCard = () => {
    return (
        <div className="relative h-full w-full">
            <div className="absolute md:-top-30 -top-25 flex h-70 md:h-60 w-full justify-center">
                <div className="relative flex h-full w-5xl items-center justify-between rounded-4xl border-8 border-background bg-secondary px-5 md:px-14">
                    <div className="flex flex-col md:gap-0 gap-5 md:flex-row h-fit w-full">
                        <div className="flex w-full flex-col gap-2 text-white">
                            <h1 className="flex items-center gap-4 font-poppins text-xl font-semibold md:text-3xl">
                                Bergabung bersama kami
                            </h1>
                            <p className="w-full text-sm opacity-70 md:w-2/3 md:text-base">
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
                    </div>
                    <div className="absolute top-0 right-0 flex h-12 w-fit items-center gap-2 rounded-bl-xl bg-background px-6 md:w-50">
                        <div className="h-8 w-8">
                            <img
                                src=""
                                alt="ini adalah profil"
                                className="h-full w-full rounded-full border border-primary"
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
        <div className="relative mt-20 flex h-fit w-full flex-col bg-secondary pb-10">
            <ContainerWrapper>
                <JoinCard />
            </ContainerWrapper>
            <div className="flex flex-col items-center justify-center bg-secondary md:pt-40 pt-60 ">
                <h1 className="w-full text-center font-poppins text-xl md:text-4xl font-bold text-white">
                    Apa Kata Orang-Orang
                </h1>
                <p className="w-full text-center font-poppins  text-sm font-medium text-white/80">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit. lorem5
                </p>
            </div>
            <ContainerWrapper>
                <ContainerReviewsCard />
            </ContainerWrapper>
        </div>
    );
};

export default TopReviews;
