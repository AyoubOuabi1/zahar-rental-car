"use client"

import { Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDown, Globe, LogIn, MenuIcon, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-50 via-blue-50 to-white shadow-lg sticky top-0 z-50 border-b border-gray-200"
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="text-2xl font-bold">
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-gray-700 to-blue-700 bg-clip-text text-transparent hover:from-gray-800 hover:to-blue-800 transition-all duration-300"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Zahar Luxury Car
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {[
                        { href: "/", label: "Accueil" },
                        { href: "/cars", label: "Nos Voitures" },
                        { href: "/locations", label: "Lieux" },
                        { href: "/about", label: "À Propos" },
                        { href: "/contact", label: "Contactez-nous" },
                    ].map((item) => (
                        <motion.div key={item.href} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                            <Link
                                href={item.href}
                                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-gray-600 hover:to-blue-600 hover:bg-clip-text font-medium transition-all duration-300 relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Right Section: Language & Login */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Language Selector */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-gray-600 hover:to-blue-600 hover:bg-clip-text transition-all duration-300 font-medium">
                            <Globe className="w-5 h-5" />
                            <span>Français</span>
                            <ChevronDown className="w-4 h-4" />
                        </Menu.Button>
                        <Transition
                            as={motion.div}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-44 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                                {["Français", "English"].map((lang) => (
                                    <Menu.Item key={lang}>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active ? "bg-gradient-to-r from-gray-100 to-blue-100" : ""
                                                } w-full text-left px-4 py-3 text-gray-700 font-medium hover:text-gray-900 transition-all duration-200`}
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/dashboard"
                            className="flex items-center space-x-2 bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <LogIn className="w-5 h-5" />
                            <span>CONNEXION</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Menu Toggle */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-gray-600 hover:to-blue-600 hover:bg-clip-text transition-all duration-300 p-2 rounded-lg hover:bg-gray-100"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <Transition
                show={isMobileMenuOpen}
                as={motion.div}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className="md:hidden bg-gradient-to-br from-white to-gray-50 border-t border-gray-200 shadow-lg"
            >
                <nav className="flex flex-col space-y-2 p-6">
                    {[
                        { href: "/", label: "Accueil" },
                        { href: "/cars", label: "Nos Voitures" },
                        { href: "/locations", label: "Lieux" },
                        { href: "/about", label: "À Propos" },
                        { href: "/contact", label: "Contactez-nous" },
                    ].map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link
                                href={item.href}
                                className="block text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-gray-600 hover:to-blue-600 hover:bg-clip-text font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 relative group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                                <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-blue-600 group-hover:w-8 transition-all duration-300"></span>
                            </Link>
                        </motion.div>
                    ))}

                    <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                        {/* Language Selector in Mobile */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-gray-600 hover:to-blue-600 hover:bg-clip-text transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-100">
                                <Globe className="w-5 h-5" />
                                <span>Français</span>
                                <ChevronDown className="w-4 h-4" />
                            </Menu.Button>
                            <Transition
                                as={motion.div}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-0 mt-2 w-44 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                                    {["Français", "English"].map((lang) => (
                                        <Menu.Item key={lang}>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active ? "bg-gradient-to-r from-gray-100 to-blue-100" : ""
                                                    } w-full text-left px-4 py-3 text-gray-700 font-medium hover:text-gray-900 transition-all duration-200`}
                                                >
                                                    {lang}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <LogIn className="w-5 h-5" />
                                <span>CONNEXION</span>
                            </Link>
                        </motion.div>
                    </div>
                </nav>
            </Transition>
        </motion.header>
    )
}
