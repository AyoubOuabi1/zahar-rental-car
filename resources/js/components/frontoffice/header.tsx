import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Menu, Transition } from "@headlessui/react";
import {
    ChevronDown,
    Globe,
    LogIn,
    Menu as MenuIcon,
    X,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-blue-50 to-white shadow-md sticky top-0 z-50"
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link
                        href="/"
                        className="text-gray-900 hover:text-blue-600 transition"
                    >
                        Zahar Luxury Car
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {[
                        { href: "/", label: "Accueil" },
                        { href: "/cars", label: "Nos Voitures" },
                        { href: "/locations", label: "Lieux" },
                        { href: "/about", label: "À Propos" },
                        { href: "/contact", label: "Contactez-nous" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-gray-800 hover:text-blue-600 transition-all hover:border-b-2 border-blue-600"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Section: Language & Login */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Language Selector */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition">
                            <Globe className="w-5 h-5" />
                            <span>Français</span>
                            <ChevronDown className="w-4 h-4" />
                        </Menu.Button>
                        <Transition
                            as={motion.div}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
                                {["Français", "English"].map((lang) => (
                                    <Menu.Item key={lang}>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active ? "bg-blue-50" : ""
                                                } w-full text-left px-4 py-2 text-gray-800`}
                                            >
                                                {lang}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {/* Login Button */}
                    <Link
                        href="/login"
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        <LogIn className="w-5 h-5" />
                        <span>CONNEXION</span>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-gray-800 hover:text-blue-600 transition"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <Transition
                show={isMobileMenuOpen}
                as={motion.div}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className="md:hidden bg-white border-t border-gray-200"
            >
                <nav className="flex flex-col space-y-4 p-4">
                    {[
                        { href: "/", label: "Accueil" },
                        { href: "/cars", label: "Nos Voitures" },
                        { href: "/locations", label: "Lieux" },
                        { href: "/about", label: "À Propos" },
                        { href: "/contact", label: "Contactez-nous" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-gray-800 hover:text-blue-600 transition-all hover:border-b-2 border-blue-600"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="flex flex-col space-y-4">
                        {/* Language Selector in Mobile */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition">
                                <Globe className="w-5 h-5" />
                                <span>Français</span>
                                <ChevronDown className="w-4 h-4" />
                            </Menu.Button>
                            <Transition
                                as={motion.div}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
                                    {["Français", "English"].map((lang) => (
                                        <Menu.Item key={lang}>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active ? "bg-blue-50" : ""
                                                    } w-full text-left px-4 py-2 text-gray-800`}
                                                >
                                                    {lang}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        {/* Mobile Login Button */}
                        <Link
                            href="/login"
                            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            <LogIn className="w-5 h-5" />
                            <span>CONNEXION</span>
                        </Link>
                    </div>
                </nav>
            </Transition>
        </motion.header>
    );
}
