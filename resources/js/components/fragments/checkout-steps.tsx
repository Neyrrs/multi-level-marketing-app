import ContainerWrapper from './container-wrapper';

const CheckoutSteps = () => {
    return (
        <div className="flex md:h-[70vh] h-fit py-10 md:py-0 relative w-full bg-linear-to-r from-secondary to-primary">
            <ContainerWrapper>
                <div className="flex h-full items-center">
                    <div className="flex w-full justify-between">
                        <div className="flex h-fit w-fit max-w-130 flex-col gap-4 text-white">
                            <div className="flex flex-col gap-1">
                                <h1 className="font-semibold flex items-center gap-2 md:gap-4 text-xl md:text-3xl">
                                    Langkah-langkah{''}
                                    <span className="flex items-center justify-center rounded-full bg-white px-4 py-2 font-bold text-secondary">
                                        {' '}
                                        Pemesanan
                                    </span>
                                </h1>
                                <p className='opacity-70 md:text-base text-sm'>
                                    Proses transaksi yang efisien untuk mendukung produktivitas Anda.
                                </p>
                            </div>
                            <p className="w-full text-sm text-left md:text-base">
                                Kami menyediakan sistem pemesanan yang terintegrasi untuk memudahkan Anda dalam mendapatkan layanan infrastruktur gedung berkualitas. Cukup pilih produk, konfirmasi detail pengiriman, dan selesaikan pembayaran dengan aman melalui metode yang tersedia. Tim kami siap memastikan setiap langkah pesanan Anda diproses dengan standar profesionalisme tertinggi.
                            </p>
                        </div>
                        <div className="h-100 w-120 md:block hidden overflow-hidden rounded-xl bg-white shadow-xl">
                            <img 
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                                alt="Modern Workspace"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </ContainerWrapper>
            <div className="absolute w-1/2 md:block hidden rounded-full bg-black h-6 -bottom-3 -right-5"></div>
        </div>
    );
};

export default CheckoutSteps;
