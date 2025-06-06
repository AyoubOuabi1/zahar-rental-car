import { Head } from "@inertiajs/react"
import { motion } from "framer-motion"
import type { Car } from "@/types/Car"
import FrontOfficeLayout from "@/layouts/FrontOfficeLayout"
import CarCard from "@/components/frontoffice/CarCard"
import { Home, ChevronRight, CarIcon, Filter, Search } from "lucide-react"
import { useState } from "react"

interface Props {
    cars: Car[]
}

export default function CarsIndex({ cars }: Props) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Get unique categories
    const categories = Array.from(new Set(cars.map((car) => car.category)))

    // Filter cars based on search and category
    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            searchTerm === "" ||
            car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.model.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategory === null || car.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <FrontOfficeLayout>
            <Head title="Nos Voitures" />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-blue-900 text-white py-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="https://cristallinecar.com/assets/img/facts-section.jpg"
                        alt="Mountains background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-900/70 to-blue-900/80"></div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute inset-0 z-5">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-6"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Notre Flotte Premium
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center justify-center text-sm mb-8"
                    >
                        <a href="/" className="flex items-center hover:text-blue-300 transition-colors duration-300">
                            <Home className="w-4 h-4 mr-1" />
                            <span>Accueil</span>
                        </a>
                        <ChevronRight className="mx-2 w-4 h-4 text-gray-400" />
                        <span>Page</span>
                        <ChevronRight className="mx-2 w-4 h-4 text-gray-400" />
                        <span className="text-blue-300 font-medium">Nos Voitures</span>
                    </motion.div>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-1 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto rounded-full"
                    ></motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-white relative overflow-hidden py-16">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-3 rounded-full mr-4">
                                <CarIcon className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                🚗 Voitures Disponibles 🚗
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                            Découvrez notre flotte de véhicules premium pour tous vos besoins de déplacement
                        </p>
                        {/* Decorative line */}
                        <div className="h-1 w-24 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto rounded-full"></div>
                    </motion.div>

                    {/* Search and Filter Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Search */}
                                <div className="col-span-1 md:col-span-2">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Rechercher par marque ou modèle..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Filter className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            value={selectedCategory || ""}
                                            onChange={(e) => setSelectedCategory(e.target.value || null)}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 appearance-none"
                                        >
                                            <option value="">Toutes les catégories</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <ChevronRight className="h-5 w-5 text-gray-400 transform rotate-90" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Count */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-8 flex justify-between items-center"
                    >
                        <p className="text-gray-600 font-medium">
                            {filteredCars.length} {filteredCars.length === 1 ? "voiture trouvée" : "voitures trouvées"}
                        </p>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-700">Trier par:</span>{" "}
                            <select className="ml-2 border-b border-gray-300 bg-transparent focus:outline-none text-gray-700 font-medium">
                                <option>Prix croissant</option>
                                <option>Prix décroissant</option>
                                <option>Popularité</option>
                                <option>Nouveautés</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Car Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 * (index % 3),
                                    ease: "easeOut",
                                }}
                            >
                                <CarCard {...car} />
                            </motion.div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredCars.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-16"
                        >
                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
                            <p className="text-gray-600 text-lg mb-6">Aucun véhicule ne correspond à vos critères de recherche.</p>
                            <button
                                onClick={() => {
                                    setSearchTerm("")
                                    setSelectedCategory(null)
                                }}
                                className="bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Réinitialiser les filtres
                            </button>
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {filteredCars.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex justify-center mt-16"
                        >
                            <div className="flex space-x-2">
                                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300">
                                    <ChevronRight className="h-5 w-5 text-gray-600 transform rotate-180" />
                                </button>
                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                            page === 1
                                                ? "bg-gradient-to-r from-gray-600 to-blue-600 text-white shadow-md"
                                                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300">
                                    <ChevronRight className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </FrontOfficeLayout>
    )
}
