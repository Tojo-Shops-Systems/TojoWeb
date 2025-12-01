'use client';

import { X, ChevronRight, House, Tv, Headphones, Cable, ShieldCheck, Sparkles, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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

    const categories = [
        { name: 'SMART HOME', icon: House, href: '/smart-home' },
        { name: 'TV Y VIDEO', icon: Tv, href: '/tv-video' },
        { name: 'AUDIO', icon: Headphones, href: '/audio' },
        { name: 'CABLES', icon: Cable, href: '/cables' },
        { name: 'SEGURIDAD', icon: ShieldCheck, href: '/seguridad' },
        { name: 'LO NUEVO', icon: Sparkles, href: '/new' },
    ];

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
                    <button className="flex-1 py-4 text-white font-bold text-sm border-b-2 border-blue-500">
                        MENU
                    </button>
                    <button className="flex-1 py-4 text-gray-400 font-bold text-sm hover:text-white transition-colors">
                        MI CUENTA
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                    <div className="flex flex-col gap-2">
                        {categories.map((cat, index) => (
                            <Link
                                key={index}
                                href={cat.href}
                                className="flex items-center gap-4 py-3 text-gray-300 hover:text-white transition-colors group"
                                onClick={onClose}
                            >
                                <cat.icon className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
                                <span className="text-sm font-medium">{cat.name}</span>
                            </Link>
                        ))}

                        <div className="h-px bg-gray-700 my-2" />

                        <Link href="/categories" className="flex items-center gap-4 py-3 text-gray-300 hover:text-white transition-colors" onClick={onClose}>
                            <Plus className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
                            <span className="text-sm font-medium">MÁS CATEGORÍAS</span>
                        </Link>

                        <Link href="/stores" className="flex items-center gap-4 py-3 text-gray-300 hover:text-white transition-colors" onClick={onClose}>
                            <MapPin className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                            <span className="text-sm font-medium">TIENDAS</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
