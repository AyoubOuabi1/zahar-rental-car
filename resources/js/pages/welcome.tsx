import Header from '@/components/frontoffice/header';
import ReservationSection from '@/components/frontoffice/ReservationSection';
import PremiumProtection from '@/components/frontoffice/protectionItems';
import CarCarousel from '@/components/frontoffice/CarCarousel';
import WhyChooseUs from '@/components/frontoffice/WhyChooseUs';
import ZaharInNumbers from '@/components/frontoffice/ZaharInNumbers';
import Footer from '@/components/frontoffice/Footer';


export default function Welcome() {

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <div className="pt-15">
                <ReservationSection />
            </div>
            <div>
                <PremiumProtection />
            </div>
            <div>
                <CarCarousel />
            </div>
            <div>
                {/* Other sections */}
                <WhyChooseUs />
                {/* Other sections */}
            </div>
            <div>
                {/* Other sections */}
                <ZaharInNumbers />
                {/* Other sections */}
            </div>
            <div>
                {/* Other sections */}
                <Footer />
            </div>
           </>
    );
}
