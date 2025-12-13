import ContainerWrapper from './container-wrapper';

const HomeAboutUs = () => {
    return (
        <ContainerWrapper>
            <div className="relative flex h-[90vh] w-full items-center">
                <div className="flex h-full w-full items-center">
                    <div className="flex w-full items-center justify-center gap-40">
                        <div className="relative h-120 w-120 rounded-xl bg-white shadow-xl">
                            <img src="" alt="" />
                            <div className="absolute top-1/2 -right-25 h-80 w-80 -translate-y-1/2 rounded-xl bg-white">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="flex h-fit w-fit max-w-130 flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="font-bold font-poppins flex items-center gap-4 text-3xl">
                                    Tentang Kami{''}
                                </h1>
                            </div>
                            <p className="w-3/4">
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
