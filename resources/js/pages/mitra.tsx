import ContainerWrapper from '@/components/fragments/container-wrapper';
import MainLayout from '@/components/fragments/main-layout';

import BenefitSection from '@/components/fragments/sections/mitra-benefit';
import HeroSection from '@/components/fragments/sections/mitra-hero';
import HighlightSection from '@/components/fragments/sections/mitra-highlight';
import IncomeSimulationSection from '@/components/fragments/sections/mitra-income-simulation';
import JoinStepsSection from '@/components/fragments/sections/mitra-join-steps';
import ProblemSection from '@/components/fragments/sections/mitra-problem';

const Mitra = () => {
    return (
        <MainLayout>
            <HeroSection />
            <HighlightSection />

            <ContainerWrapper>
                <ProblemSection />
                <BenefitSection />
                <IncomeSimulationSection />
            </ContainerWrapper>

            <JoinStepsSection />
        </MainLayout>
    );
};

export default Mitra;
