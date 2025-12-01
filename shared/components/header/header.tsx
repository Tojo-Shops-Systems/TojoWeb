'use client';

import Link from 'next/link';

const Header = () => {
    return (
        <header className="sticky top-4 z-50 w-full px-6">
            <div className="w-full max-w-7xl mx-auto">
                <div className="w-full h-[70px] bg-white rounded-full border-2 border-gray-300 shadow-md flex items-center px-8">
                    <div className="w-full flex items-center justify-between gap-6">
                        {/* TojoShop Logo */}
                        <Link href="/" className="text-xl font-bold text-gray-900 shrink-0 hover:text-gray-700 transition-colors">
                            TojoShop
                        </Link>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                                />
                                <button className="absolute right-0 top-0 h-full px-3 text-gray-600 hover:text-gray-900 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 shrink-0">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-900 hover:bg-gray-100 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span className="text-sm font-medium">Iniciar Sesión</span>
                            </button>

                            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-900 hover:bg-gray-100 transition-colors relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                <span className="text-sm font-medium">Carrito</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;