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
        <>
            {showNavbar && <NavigationBar />}
            <div
                className={`min-h-screen max-w-screen ${showNavbar ? 'pt-15' : ''}`}
            >
                {children}
            </div>
            {showFooter && <Footer />}
        </>
    );
};

export default MainLayout;
