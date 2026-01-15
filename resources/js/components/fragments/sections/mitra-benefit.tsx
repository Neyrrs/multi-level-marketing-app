import { Wallet } from 'lucide-react';

const benefits = [
    {
        title: 'Komisi dari penjualan',
        desc: 'Congue hendrerit. Fusce vel porta dui. Donec efficitur consequat arcu, eu malesuada elit pharetra ac. Mauris elementum pulvinar magna.',
    },
    {
        title: 'Komisi dari penjualan',
        desc: 'Congue hendrerit. Fusce vel porta dui. Donec efficitur consequat arcu, eu malesuada elit pharetra ac. Mauris elementum pulvinar magna.',
    },
    {
        title: 'Komisi dari penjualan',
        desc: 'Congue hendrerit. Fusce vel porta dui. Donec efficitur consequat arcu, eu malesuada elit pharetra ac. Mauris elementum pulvinar magna.',
    },
    {
        title: 'Komisi dari penjualan',
        desc: 'Congue hendrerit. Fusce vel porta dui. Donec efficitur consequat arcu, eu malesuada elit pharetra ac. Mauris elementum pulvinar magna.',
    },
    {
        title: 'Komisi dari penjualan',
        desc: 'Congue hendrerit. Fusce vel porta dui. Donec efficitur consequat arcu, eu malesuada elit pharetra ac. Mauris elementum pulvinar magna.',
    },
    {
        title: 'Komisi dari penjualan',
        desc: 'Congue hendrerit. Fusce vel porta dui. Donec efficitur consequat arcu, eu malesuada elit pharetra ac. Mauris elementum pulvinar magna.',
    },
];

const BenefitSection = () => {
    return (
        <section className="">
            <div className="mx-auto max-w-7xl px-6 text-center">
                <h2 className="text-4xl font-bold">Apa untungnya?</h2>

                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam risus odio, dictum id turpis vitae, semper porttitor
                    ipsum.
                </p>

                <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
                    {benefits.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-primary p-8 text-left text-white shadow-lg"
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                                <Wallet className="h-6 w-6 text-primary" />
                            </div>

                            <h3 className="text-lg font-semibold">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm text-white/90">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitSection;
