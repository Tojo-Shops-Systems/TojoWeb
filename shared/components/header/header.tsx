'use client';

import Link from 'next/link';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Menu, ShoppingCart, Search, User, X } from 'lucide-react';
import MobileMenu from './mobile-menu';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types/types';
import Image from 'next/image';
import { Env } from "../../../env";

interface HeaderProps {
    products?: Product[];
    onProductClick?: (productCode: string) => void;
    onCategoryClick?: (categoryId: string) => void;
    onCartClick?: () => void;
}

const SearchBar = ({ products, onProductClick }: { products: Product[], onProductClick?: (code: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Filter products based on search term
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) return [];
        const term = searchTerm.toLowerCase();
        return products.filter(product =>
            product.productName.toLowerCase().includes(term) ||
            product.product_code.toLowerCase().includes(term)
        ).slice(0, 5); // Limit to 5 results
    }, [searchTerm, products]);

    // Close search dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                />
                {searchTerm ? (
                    <button
                        className="absolute right-10 top-0 h-full px-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchTerm('')}
                    >
                        <X className="w-4 h-4" />
                    </button>
                ) : null}
                <button className="absolute right-0 top-0 h-full px-3 text-gray-600 hover:text-gray-900 transition-colors">
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Search Results Dropdown */}
            {isSearchFocused && searchTerm && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {filteredProducts.length > 0 ? (
                        <ul>
                            {filteredProducts.map((product, index) => (
                                <li key={index} className="border-b border-gray-50 last:border-none">
                                    <button
                                        className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors text-left"
                                        onClick={() => {
                                            setIsSearchFocused(false);
                                            setSearchTerm('');
                                            if (onProductClick) {
                                                onProductClick(product.product_code);
                                            }
                                        }}
                                    >
                                        <div className="relative w-10 h-10 shrink-0 bg-white rounded border border-gray-100 p-1">
                                            <Image
                                                src={product.product_url_image}
                                                alt={product.productName}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{product.productName}</p>
                                            <p className="text-xs text-red-600 font-bold">${product.price.toFixed(2)}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            No se encontraron productos
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const Header = ({ products = [], onProductClick, onCategoryClick, onCartClick }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { cart } = useCart();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch(Env.logueado, {
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.result) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error checking login status:", error);
            }
        };

        checkLoginStatus();
    }, []);

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
                                <SearchBar products={products} onProductClick={onProductClick} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4 shrink-0">
                                {/* Login (Desktop Only) */}
                                <Link href={isLoggedIn ? "/account" : "/auth"} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-gray-900 hover:bg-gray-100 transition-colors">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-medium">{isLoggedIn ? 'Mi Cuenta' : 'Iniciar Sesión'}</span>
                                </Link>

                                {/* Cart */}
                                <button
                                    onClick={onCartClick}
                                    className="flex items-center gap-2 md:px-4 md:py-2 rounded-full text-gray-900 hover:bg-gray-100 transition-colors relative"
                                >
                                    <div className="relative">
                                        <ShoppingCart className="w-6 h-6 md:w-5 md:h-5" />
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            {cart?.items?.length || 0}
                                        </span>
                                    </div>
                                    <span className="hidden md:block text-sm font-medium">Carrito</span>
                                </button>
                            </div>
                        </div>

                        {/* Search Bar (Mobile Only) */}
                        <div className="w-full md:hidden">
                            <SearchBar products={products} onProductClick={onProductClick} />
                            <div className="h-[1px] bg-red-600 w-full mt-2"></div>
                        </div>

                    </div>
                </div>
            </header>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onCategoryClick={onCategoryClick} isLoggedIn={isLoggedIn} />
        </>
    );
}

export default Header;