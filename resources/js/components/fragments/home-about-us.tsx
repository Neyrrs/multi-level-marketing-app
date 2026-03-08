import ContainerWrapper from './container-wrapper';

const HomeAboutUs = () => {
    return (
        <ContainerWrapper>
            <div className="relative flex h-fit md:py-0 py-10 md:h-[90vh] w-full items-center">
                <div className="flex h-full w-full items-center">
                    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-4 md:gap-40">
                        <div className="relative md:h-120 md:w-120 w-full h-70 overflow-hidden rounded-xl bg-white shadow-xl">
                            <img 
                                src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop" 
                                alt="Innovation Center"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex md:text-left text-justify h-fit w-fit max-w-130 flex-col gap-4">
                            <div className="flex flex-col md:gap-1">
                                <h1 className="font-bold font-poppins flex md:justify-start justify-center items-center gap-4 text-xl md:text-3xl">
                                    Tentang Kami{''}
                                </h1>
                            </div>
                            <p className="md:w-3/4 w-full md:text-base text-sm leading-relaxed">
                                Alus Astech adalah mitra terpercaya Anda dalam menghadirkan solusi infrastruktur gedung masa depan. Kami percaya bahwa teknologi dan arsitektur harus berjalan selaras untuk menciptakan lingkungan yang inspiratif dan produktif. Dengan fokus pada keunggulan teknis dan detail estetika, kami membantu Anda mewujudkan visi pembangunan yang berkelanjutan dan modern.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default HomeAboutUs;
