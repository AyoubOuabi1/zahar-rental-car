import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Locations */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                        Lieux
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>Aéroport de Tanger (TNG)</li>
                        <li>Aéroport de Casablanca (CMN)</li>
                        <li>Aéroport de Marrakech (RAK)</li>
                        <li>Aéroport d’Agadir (AGA)</li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-green-400" />
                        Téléphone de contact
                    </h3>
                    <p className="mb-4 text-gray-300">
                        Infos & Réservations: <br />
                        <a href="tel:+2126350796447" className="hover:text-blue-500 transition">
                            +212 635 079 6447
                        </a>
                    </p>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-red-400" />
                        E-mail de contact
                    </h3>
                    <p className="text-gray-300">
                        <strong>Réservations:</strong> <br />
                        <a href="mailto:matiegehsom@gmail.com" className="hover:text-blue-500 transition">
                            matiegehsom@gmail.com
                        </a>
                    </p>
                </div>

                {/* Working Hours */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                        Heures de travail
                    </h3>
                    <p className="text-gray-300">
                        24h/7 - Disponible à tout moment
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-blue-400">Zahar Luxury Car</h3>
                    <ul className="space-y-2">
                        {['Accueil', 'À propos', 'Lieux', 'Contactez-nous'].map((link, index) => (
                            <li key={index}>
                                <a href="#" className="text-gray-300 hover:text-blue-500 transition">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Company Description */}
            <div className="max-w-7xl mx-auto px-6 mt-8 border-t border-gray-800 pt-8 text-center">
                <p className="text-gray-400">
                    Nous sommes une entreprise spécialisée dans la location de voitures, offrant un service de qualité supérieure.
                </p>
                <p className="text-gray-400 mt-2">
                    © {new Date().getFullYear()} Zahar Luxury Car. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
}
