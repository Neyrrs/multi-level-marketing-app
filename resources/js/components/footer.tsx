import { home, mitra, product } from '@/routes';
import { Link } from '@inertiajs/react';
import ContainerWrapper from './fragments/container-wrapper';

const Footer = () => {
    return (
        <footer className="bg-white">
            <ContainerWrapper>
                <div className="py-10">
                    <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                        <div className="max-w-md">
                            <div className="mb-3 flex items-center gap-2 text-3xl font-bold">
                                ALUS
                            </div>
                            <p className="text-sm leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Pellentesque blandit velit, sit
                                amet euismod risus. Fusce ac eros quis.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 font-poppins text-3xl">
                            <Link href={home()} className="hover:opacity-80">
                                Home
                            </Link>
                            <Link href={mitra()} className="hover:opacity-80">
                                Mitra
                            </Link>
                            <Link href={product()} className="hover:opacity-80">
                                Produk
                            </Link>
                        </div>
                    </div>
                    <div className="mt-10 border-t border-black pt-4 text-xs text-gray-500">
                        Copyright © 2025 Alus. All Right Reserved
                    </div>
                </div>
            </ContainerWrapper>
        </footer>
    );
};

export default Footer;
