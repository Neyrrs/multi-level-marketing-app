import { Button } from '@/components/ui/button';

const HeroSection = () => {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden">
            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                <h1 className="text-4xl leading-tight font-bold md:text-5xl">
                    Peluang Cuan 2025 <br />
                    <span className="text-primary">
                        Afiliasi, Reseller & Dropship
                    </span>
                    <br />
                    Yang Lagi Naik Daun
                </h1>

                <p className="mt-6 text-muted-foreground">
                    Proin pharetra diam sit amet metus dignissim pharetra. Sed
                    libero neque, ullamcorper a venenatis vitae, lobortis sed
                    velit.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Button variant="outline">Lihat Cara Kerja</Button>
                    <Button>Daftar Sekarang</Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
