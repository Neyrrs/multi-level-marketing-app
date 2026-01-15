const HighlightSection = () => {
    return (
        <section className="bg-primary py-20 text-white">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
                <div>
                    <h2 className="text-3xl font-bold">
                        Siapa Yang Mau Cuan <br />
                        10 Juta Per Bulan?
                    </h2>

                    <p className="mt-4 text-white/80">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam risus odio, dictum id turpis vitae.
                    </p>

                    <button className="mt-6 inline-flex items-center gap-2 font-medium">
                        Pelajari lebih lanjut →
                    </button>
                </div>

                <div className="flex justify-end">
                    <img
                        src="https://images.unsplash.com/photo-1762692496722-de2a899e3af5"
                        className="rounded-2xl shadow-xl"
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
};

export default HighlightSection;
