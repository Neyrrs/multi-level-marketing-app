export const ReviewCard = () => {
    return (
        <div className="border-white-2 relative flex gap-4 h-25 w-sm shrink-0 items-start justify-start rounded-md bg-white p-4">
            <div className="h-15 w-15">
                <img
                    src="#"
                    alt="Ini adalah profil"
                    className="h-full w-full rounded-full border-2 aspect-square border-primary object-fill"
                />
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-base font-bold text-primary">John Doe</h1>
                <p className="text-xs w-3/4">Username</p>
            </div>
            <p className="absolute bottom-4 right-4 text-xs font-bold opacity-75">Tanggal</p>
        </div>
    );
};

export const ContainerReviewsCard = () => {
    return (
        <div className="flex w-full flex-col justify-center gap-8 py-6">
            <div className="flex flex-wrap justify-around">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
            <div className="flex flex-wrap justify-center gap-15">
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    );
};
