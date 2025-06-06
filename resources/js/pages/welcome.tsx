import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import ReservationSection from '@/components/frontoffice/ReservationSection';
import PremiumProtection from '@/components/frontoffice/protectionItems';
import CarCarousel from '@/components/frontoffice/CarCarousel';
import WhyChooseUs from '@/components/frontoffice/WhyChooseUs';
import ZaharInNumbers from '@/components/frontoffice/ZaharInNumbers';
import { Car } from '@/types/Car';
import FrontOfficeLayout from '@/layouts/FrontOfficeLayout';
import PlaceCarousel from '@/components/frontoffice/PlaceCarousel';
interface Place {
    id: number;
    title: string;
    shortDescription?: string;
    image_url: string;
    showInHomePage: boolean;
}
export default function Welcome() {
    const { cars , places } = usePage<{ cars: Car[] }>().props;

    return (
        <FrontOfficeLayout>
            <Head title="Welcome" />

            <div>
                <ReservationSection places={places} />
            </div>

            <div>
                <PremiumProtection />
            </div>

            <div>
                <CarCarousel cars={cars} />
            </div>

            <div>
                <WhyChooseUs />
            </div>

            <div>
                <ZaharInNumbers />
            </div>
            <div>
                <PlaceCarousel places={places} />
            </div>
        </FrontOfficeLayout>
    );
}
