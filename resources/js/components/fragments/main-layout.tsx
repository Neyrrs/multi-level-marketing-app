import * as React from 'react';
import Footer from '../footer';
import NavigationBar from '../navigation-bar';

const MainLayout = ({
    children,
    showNavbar = true,
    showFooter = true,
}: {
    children: React.ReactNode;
    showNavbar?: boolean;
    showFooter?: boolean;
}) => {
    return (
        <div className="flex min-h-screen flex-col">
            {showNavbar && <NavigationBar />}

            <main className={`flex-1 ${showNavbar ? 'pt-15' : ''}`}>
                {children}
            </main>

            {showFooter && <Footer />}
        </div>
    );
};

export default MainLayout;
