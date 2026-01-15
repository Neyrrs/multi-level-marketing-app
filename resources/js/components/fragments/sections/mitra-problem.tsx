import { Clock, TrendingUp, Wallet } from 'lucide-react';

const ProblemSection = () => {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="rounded-2xl border-2 border-primary p-12 shadow-xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <h2 className="text-4xl leading-tight font-bold">
                                Gak punya income? <br />
                                <span className="text-primary italic">
                                    In this economy?
                                </span>
                            </h2>
                        </div>

                        <p className="">
                            Vestibulum a sapien in, ornare pellentesque magna.
                            Suspendisse tincidunt ac turpis non elementum.
                            Quisque semper.
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
                        <Item
                            icon={<Wallet className="h-6 w-6 text-primary" />}
                            title="Biaya Hidup"
                            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, arcu at maximus."
                        />

                        <Item
                            icon={<Clock className="h-6 w-6 text-primary" />}
                            title="Tiap Minggu?"
                            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, arcu at maximus."
                        />

                        <Item
                            icon={
                                <TrendingUp className="h-6 w-6 text-primary" />
                            }
                            title="Makin Naik"
                            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, arcu at maximus."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;

const Item = ({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) => {
    return (
        <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                {icon}
            </div>

            <h3 className="font-semibold">{title}</h3>

            <p className="mt-2 text-sm">{desc}</p>
        </div>
    );
};
