import { Button } from "@/components/ui/button"

interface PlaceCardProps {
    id: number
    name: string
    image: string
    shortDescription?: string
}

export default function PlaceCard({ id, name, image, shortDescription }: PlaceCardProps) {
    // Array of very light backgrounds similar to white
    const lightBackgrounds = [
        "bg-gradient-to-br from-white to-gray-50",
        "bg-gradient-to-br from-white to-blue-50",
        "bg-gradient-to-br from-white to-slate-50",
        "bg-gradient-to-br from-gray-50 to-stone-50",
        "bg-gradient-to-br from-white to-zinc-50",
        "bg-gradient-to-br from-blue-50 to-gray-50",
    ]

    // Select background based on card id for consistent colors
    const selectedBackground = lightBackgrounds[id % lightBackgrounds.length]

    return (
        <div
            className={`${selectedBackground} rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full max-h-96 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 group animate-fade-in`}
        >
            {/* Image Section */}
            <div className="relative h-40 w-full overflow-hidden">
                <img
                    src={image || "/placeholder.svg"}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Section */}
            <div className="p-4 pb-6 flex flex-col justify-between h-44 relative">
                {/* Decorative accent line */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-gray-300 to-blue-300 rounded-full"></div>

                <div className="text-center pt-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-700">
                        {name}
                    </h3>
                    {shortDescription && (
                        <p
                            className="text-gray-600 text-xs leading-relaxed overflow-hidden transition-colors duration-300 group-hover:text-gray-700"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {shortDescription}
                        </p>
                    )}
                </div>

                <div className="text-center mt-2">
                    <Button className="bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-medium px-6 py-1.5 rounded-full transition-all duration-300 text-sm transform hover:scale-105 hover:shadow-lg group-hover:animate-pulse">
                        LIRE PLUS
                    </Button>
                </div>
            </div>
        </div>
    )
}
