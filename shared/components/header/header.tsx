'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, ShoppingCart, Search, User } from 'lucide-react';
import MobileMenu from './mobile-menu';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 md:top-4 z-50 w-full md:px-6 bg-white md:bg-transparent shadow-sm md:shadow-none">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="w-full md:h-[70px] bg-white md:rounded-full md:border-2 md:border-gray-300 md:shadow-md flex flex-col md:flex-row items-center px-4 md:px-8 py-3 md:py-0 gap-3 md:gap-0">

                        {/* Top Row (Mobile) / Main Row (Desktop) */}
                        <div className="w-full flex items-center justify-between gap-6">

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-1 text-gray-600"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <Menu className="w-7 h-7" />
                            </button>

                            {/* TojoShop Logo */}
                            <Link href="/" className="text-2xl font-bold text-gray-800 shrink-0 hover:text-gray-600 transition-colors">
                                TojoShop
                            </Link>

                            {/* Search Bar (Desktop) */}
                            <div className="hidden md:block flex-1 max-w-md mx-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar productos..."
                                        className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                                    />
                                    <button className="absolute right-0 top-0 h-full px-3 text-gray-600 hover:text-gray-900 transition-colors">
                                        <Search className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4 shrink-0">
                                {/* Login (Desktop Only) */}
                                <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-gray-900 hover:bg-gray-100 transition-colors">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-medium">Iniciar Sesión</span>
                                </button>

                                {/* Cart */}
                                <button className="flex items-center gap-2 md:px-4 md:py-2 rounded-full text-gray-900 hover:bg-gray-100 transition-colors relative">
                                    <div className="relative">
                                        <ShoppingCart className="w-6 h-6 md:w-5 md:h-5" />
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            0
                                        </span>
                                    </div>
                                    <span className="hidden md:block text-sm font-medium">Carrito</span>
                                </button>
                            </div>
                        </div>

                        {/* Search Bar (Mobile Only) */}
                        <div className="w-full md:hidden">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar en toda la tienda..."
                                    className="w-full py-2 pl-3 pr-10 rounded bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                />
                                <button className="absolute right-0 top-0 h-full px-3 text-gray-400">
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="h-[1px] bg-blue-500 w-full mt-2"></div>
                        </div>

                    </div>
                </div>
            </header>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}

export default Header;