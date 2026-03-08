import ContainerWrapper from '@/components/fragments/container-wrapper';
import MainLayout from '@/components/fragments/main-layout';
import { ProductCard, type ProductItem } from '@/components/fragments/product-card';
import { Head, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface ProductPageProps {
    products: ProductItem[];
    search?: string;
}

const Product = ({ products = [], search = '' }: ProductPageProps) => {
    const [searchTerm, setSearchTerm] = useState(search);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/produk',
            { search: searchTerm },
            { preserveState: true, replace: true }
        );
    };

    return (
        <MainLayout>
            <Head title="Semua Produk" />
            <div className="py-12 bg-gray-50/50 min-h-screen">
                <ContainerWrapper>
                    {/* Header Range */}
                    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Produk Lengkap
                            </h1>
                            <p className="text-sm text-gray-500">
                                Temukan berbagai produk pilihan terbaik untuk Anda
                                {search && (
                                    <>
                                        {' '}dengan kata kunci: <span className="font-semibold text-primary">"{search}"</span>
                                    </>
                                )}
                            </p>
                        </div>
                        
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative w-full md:max-w-xs block overflow-hidden rounded-full border bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition">
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent px-5 py-3 pr-12 text-sm outline-none"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary/90"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </form>
                    </div>

                    {/* Products Grid */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                            <Search className="w-16 h-16 text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-700">Tidak ada produk ditemukan</h3>
                            <p className="text-gray-500 max-w-sm mt-2">
                                {search
                                    ? `Kami tidak dapat menemukan produk yang sesuai dengan pencarian "${search}". Coba gunakan kata kunci lain.`
                                    : 'Belum ada produk yang tersedia saat ini.'}
                            </p>
                            {search && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        router.get('/produk');
                                    }}
                                    className="mt-6 text-primary font-medium hover:underline"
                                >
                                    Hapus pencarian
                                </button>
                            )}
                        </div>
                    )}
                </ContainerWrapper>
            </div>
        </MainLayout>
    );
};

export default Product;