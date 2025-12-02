'use client';

import { X, ChevronRight, House, Tv, Headphones, Cable, ShieldCheck, Sparkles, MapPin, Plus, Grid } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Env } from '../../../env';
import { Category } from '../../types/types';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onCategoryClick?: (categoryId: string) => void;
}

interface ApiResponse {
    result: boolean;
    msg: string;
    data: Category[];
}

const MobileMenu = ({ isOpen, onClose, onCategoryClick }: MobileMenuProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [activeTab, setActiveTab] = useState<'menu' | 'account'>('menu');

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(Env.allCategories);
                const data: ApiResponse = await response.json();
                if (data.result) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId: string) => {
        if (onCategoryClick) {
            onCategoryClick(categoryId);
        }
        onClose();
    };

    const mainCategories = categories.slice(0, 6);
    const moreCategories = categories.slice(6);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#1a1a1a] z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header Tabs */}
                <div className="flex items-center border-b border-gray-700">
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'menu' ? 'text-white border-b-2 border-red-600' : 'text-gray-400 hover:text-white'}`}
                    >
                        MENU
                    </button>
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'account' ? 'text-white border-b-2 border-red-600' : 'text-gray-400 hover:text-white'}`}
                    >
                        MI CUENTA
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                    {activeTab === 'menu' ? (
                        <div className="flex flex-col gap-2">
                            {mainCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className="flex items-center gap-4 py-3 text-gray-300 hover:text-white transition-colors group w-full text-left"
                                >
                                    <Grid className="w-5 h-5 text-red-600" strokeWidth={1.5} />
                                    <span className="text-sm font-medium uppercase">{cat.category_name}</span>
                                </button>
                            ))}

                            {moreCategories.length > 0 && (
                                <>
                                    <button
                                        onClick={() => setShowMore(!showMore)}
                                        className="flex items-center gap-4 py-3 text-gray-300 hover:text-white transition-colors w-full text-left"
                                    >
                                        <Plus className={`w-5 h-5 text-red-600 transition-transform duration-300 ${showMore ? 'rotate-45' : 'rotate-0'}`} strokeWidth={2.5} />
                                        <span className="text-sm font-medium">
                                            {showMore ? 'MENOS CATEGORÍAS' : 'MÁS CATEGORÍAS'}
                                        </span>
                                    </button>

                                    <div className={`flex flex-col pl-4 border-l border-gray-700 ml-2 transition-all duration-300 ease-in-out overflow-hidden ${showMore ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        {moreCategories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => handleCategoryClick(cat.id)}
                                                className="flex items-center gap-4 py-3 text-gray-400 hover:text-white transition-colors group w-full text-left"
                                            >
                                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                                                <span className="text-sm font-medium uppercase">{cat.category_name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="h-px bg-gray-700 my-2" />

                            <Link href="/stores" className="flex items-center gap-4 py-3 text-gray-300 hover:text-white transition-colors" onClick={onClose}>
                                <MapPin className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                                <span className="text-sm font-medium">TIENDAS</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <p className="text-gray-400 text-center text-sm mb-4">
                                Inicia sesión para acceder a tu cuenta, ver tus pedidos y más.
                            </p>
                            <Link
                                href="/auth"
                                onClick={onClose}
                                className="w-full py-3 bg-red-600 text-white font-bold rounded-sm hover:bg-red-700 transition-colors uppercase text-sm text-center"
                            >
                                Iniciar Sesión
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
