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
                            <p className="text-sm leading-relaxed text-gray-600">
                                Alus Astech menghadirkan solusi teknologi infrastruktur gedung yang modern, aman, dan efisien. Kami berkomitmen untuk mendukung pertumbuhan bisnis Anda melalui layanan terbaik dan terpercaya.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 font-poppins text-3xl">
                            <Link href={home.url()} className="hover:opacity-80">
                                Beranda
                            </Link>
                            <Link href={mitra.url()} className="hover:opacity-80">
                                Mitra
                            </Link>
                            <Link href={product.url()} className="hover:opacity-80">
                                Produk
                            </Link>
                        </div>
                    </div>
                    <div className="mt-10 border-t border-gray-200 pt-4 text-xs text-gray-400">
                        Copyright © 2026 Alus Astech. All Rights Reserved
                    </div>
                </div>
            </ContainerWrapper>
        </footer>
    );
};

export default Footer;
