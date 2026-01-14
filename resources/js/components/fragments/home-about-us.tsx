import ContainerWrapper from './container-wrapper';

const HomeAboutUs = () => {
    return (
        <ContainerWrapper>
            <div className="relative flex h-fit md:py-0 py-10 md:h-[90vh] w-full items-center">
                <div className="flex h-full w-full items-center">
                    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-4 md:gap-40">
                        <div className="relative md:h-120 md:w-120 w-full h-70 rounded-xl bg-white shadow-xl">
                            <img src="" alt="" />
                            <div className="absolute md:block hidden top-1/2 -right-25 h-80 w-80 -translate-y-1/2 rounded-xl bg-white">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="flex md:text-left text-justify h-fit w-fit max-w-130 flex-col gap-4">
                            <div className="flex flex-col md:gap-1">
                                <h1 className="font-bold font-poppins flex md:justify-start justify-center items-center gap-4 text-xl md:text-3xl">
                                    Tentang Kami{''}
                                </h1>
                            </div>
                            <p className="md:w-3/4 w-full md:text-base text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Dicta earum mollitia ducimus
                                odit quibusdam optio minus, quasi dolorem
                                voluptates nisi. Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Repellat optio,
                                quos pariatur repellendus unde voluptas iste,
                                enim temporibus quaerat rem ipsa vitae
                                repudiandae, non dolores quo tempora dolorum
                                accusantium error quis reprehenderit minima.
                                Tempora provident accusantium accusamus quisquam
                                aliquid magni!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default HomeAboutUs;
