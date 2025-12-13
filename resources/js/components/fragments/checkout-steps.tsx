import ContainerWrapper from './container-wrapper';

const CheckoutSteps = () => {
    return (
        <div className="flex h-[70vh] relative w-full bg-gradient-to-r from-secondary to-primary">
            <ContainerWrapper>
                <div className="flex h-full items-center">
                    <div className="flex w-full justify-between">
                        <div className="flex h-fit w-fit max-w-130 flex-col gap-4 text-white">
                            <div className="flex flex-col gap-1">
                                <h1 className="font-semibold flex items-center gap-4 text-3xl">
                                    Langkah-langkah{''}
                                    <span className="flex items-center justify-center rounded-full bg-white px-4 py-2 font-bold text-secondary">
                                        {' '}
                                        Pemesanan
                                    </span>
                                </h1>
                                <p className='opacity-70'>
                                    eget pharetra magna aliquet id. Suspendisse
                                    ac commodo massa
                                </p>
                            </div>
                            <p className="w-full">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Dicta earum mollitia ducimus
                                odit quibusdam optio minus, quasi dolorem
                                voluptates nisi.

                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat optio, quos pariatur repellendus unde voluptas iste, enim temporibus quaerat rem ipsa vitae repudiandae, non dolores quo tempora dolorum accusantium error quis reprehenderit minima. Tempora provident accusantium accusamus quisquam aliquid magni!
                            </p>
                        </div>
                        <div className="h-100 w-120 rounded-xl bg-white shadow-xl">
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
            </ContainerWrapper>
            <div className="absolute w-1/2 rounded-full bg-black h-6 -bottom-3 -right-5"></div>
        </div>
    );
};

export default CheckoutSteps;
