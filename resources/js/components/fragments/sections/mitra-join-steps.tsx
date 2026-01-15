const steps = [
    {
        number: '01',
        title: 'Daftar Dan Aktifkan Akun',
        desc: 'Pellentesque lacinia, lacus in imperdiet luctus, lorem nisi interdum ex.',
    },
    {
        number: '01',
        title: 'Daftar Dan Aktifkan Akun',
        desc: 'Pellentesque lacinia, lacus in imperdiet luctus, lorem nisi interdum ex.',
    },
    {
        number: '01',
        title: 'Daftar Dan Aktifkan Akun',
        desc: 'Pellentesque lacinia, lacus in imperdiet luctus, lorem nisi interdum ex.',
    },
    {
        number: '01',
        title: 'Daftar Dan Aktifkan Akun',
        desc: 'Pellentesque lacinia, lacus in imperdiet luctus, lorem nisi interdum ex.',
    },
];

const JoinStepsSection = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto max-w-3xl px-6 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                    Bagaimana Cara Bergabung?
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Ut vel massa sed justo fermentum euismod. Integer augue
                    erat, vestibulum ut scelerisque et, dictum at metus.
                </p>
            </div>

            <div className="mt-10 bg-primary py-20">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-6 text-white"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white font-bold text-primary">
                                {step.number}
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm text-white/80">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JoinStepsSection;
