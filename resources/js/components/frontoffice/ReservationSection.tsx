import { motion } from 'framer-motion';
import ReservationForm from '@/components/frontoffice/ReservationForm';
import { Place } from '@/types/Place';

interface Props {
    places: Place[];
}

export default function ReservationSection({ places }: Props) {
    return (
        <section className="relative bg-blue-900 text-white py-16 h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://cristallinecar.com/assets/img/facts-section.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-blue-400  p-8 rounded-lg shadow-lg max-w-lg mx-auto text-gray-900"
                    >
                        <ReservationForm places={places} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden md:flex flex-col items-center justify-center max-w-md mx-auto text-center"
                    >
                        <h2 className="text-5xl font-bold mb-6">Obtenez 15% de réduction sur votre location !</h2>
                        <p className="text-2xl mb-6">Choisissez votre modèle aujourd'hui</p>
                        <p className="text-2xl">Louez la voiture de vos rêves.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
