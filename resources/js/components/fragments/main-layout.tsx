import * as React from 'react';
import Footer from '../footer';
import NavigationBar from '../navigation-bar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavigationBar />
            <div className="min-h-screen max-w-screen pt-15">{children}</div>
            <Footer />
        </>
    );
};

export default MainLayout;
