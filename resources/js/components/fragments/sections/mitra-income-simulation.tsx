const IncomeSimulationSection = () => {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="rounded-3xl bg-primary px-10 py-14 text-white">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* LEFT CONTENT */}
                        <div>
                            <h2 className="text-4xl leading-tight font-bold">
                                Ilustrasi Income
                            </h2>

                            <p className="mt-4 max-w-xl text-white/80">
                                Kamu Punya 20 Dropshipper Aktif. Semua Orang Di
                                Tim Jual 10 Paket Per Bulan, Komisi Yang Kamu
                                Dapet Adalah 15% Per Paket.
                            </p>

                            <div className="mt-6 space-y-2 text-white/90">
                                <p>Kalau Rata-Rata Harga Produk Rp300.000:</p>
                                <ul className="list-disc pl-5">
                                    <li>
                                        Kamu × 10 Paket × 15% = <b>Rp450.000</b>
                                    </li>
                                    <li>
                                        20 Dropshipper × 10 Paket × 15% ={' '}
                                        <b>Rp9.000.000</b>
                                    </li>
                                    <li>
                                        Total Income ={' '}
                                        <b>Rp9.450.000 / bulan</b>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* MAIN INCOME CARD */}
                            <div className="col-span-full rounded-2xl bg-white p-6 text-primary">
                                <p className="text-sm font-medium">
                                    Income Kamu
                                </p>
                                <p className="mt-2 text-4xl font-bold">
                                    Rp450.000
                                </p>

                                <div className="mt-4 space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Income Dari Tim</span>
                                        <span>Rp9.000.000</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total Income</span>
                                        <span>Rp9.450.000</span>
                                    </div>
                                </div>
                            </div>

                            <StatCard title="Komisi" value="15%" />
                            <StatCard title="Dropshipper Aktif" value="20" />
                            <StatCard
                                title="Rata-rata Produk"
                                value="Rp300.000/bln"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IncomeSimulationSection;

const StatCard = ({ title, value }: { title: string; value: string }) => {
    return (
        <div className="rounded-2xl bg-white p-5 text-primary">
            <p className="text-sm">{title}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
    );
};
