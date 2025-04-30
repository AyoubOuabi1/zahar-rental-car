import React from 'react';
import Header from '@/components/frontoffice/header';
import Footer from '@/components/frontoffice/Footer';

interface FrontOfficeLayoutProps {
    children: React.ReactNode;
}

export default function FrontOfficeLayout({ children }: FrontOfficeLayoutProps) {
    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <div className="pt-20">
                {children}
            </div>

            <div>
                <Footer />
            </div>
        </>
    );
}
