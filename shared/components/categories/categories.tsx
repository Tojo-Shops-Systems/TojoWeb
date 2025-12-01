'use client';

import Link from 'next/link';
import {
    House,
    Tv,
    Headphones,
    Cable,
    ShieldCheck,
    Sparkles,
    Plus,
    MapPin
} from 'lucide-react';

const Categories = () => {
    const categories = [
        { name: 'SMART HOME', icon: House, href: '/smart-home', color: 'text-blue-500' },
        { name: 'TV Y VIDEO', icon: Tv, href: '/tv-video', color: 'text-blue-400' },
        { name: 'AUDIO', icon: Headphones, href: '/audio', color: 'text-blue-400' },
        { name: 'CABLES', icon: Cable, href: '/cables', color: 'text-blue-400' },
        { name: 'SEGURIDAD', icon: ShieldCheck, href: '/seguridad', color: 'text-blue-400' },
        { name: 'LO NUEVO', icon: Sparkles, href: '/new', color: 'text-blue-400' },
    ];

    return (
        <div className="hidden md:block w-full bg-white border-b border-gray-100 py-6 mt-4">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center overflow-x-auto no-scrollbar gap-8">

                    {/* Main Categories */}
                    {categories.map((cat, index) => (
                        <Link
                            key={index}
                            href={cat.href}
                            className="flex items-center gap-3 group whitespace-nowrap"
                        >
                            <cat.icon className={`w-5 h-5 ${cat.color} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors uppercase tracking-wide">
                                {cat.name}
                            </span>
                        </Link>
                    ))}

                    {/* Additional Categories */}
                    <Link href="/categories" className="flex items-center gap-3 group whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors uppercase tracking-wide">
                            MÁS CATEGORÍAS
                        </span>
                        <Plus className="w-5 h-5 text-blue-600 group-hover:rotate-90 transition-transform" strokeWidth={2.5} />
                    </Link>

                    <Link href="/stores" className="flex items-center gap-3 group whitespace-nowrap">
                        <MapPin className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-blue-500 group-hover:text-blue-600 transition-colors uppercase tracking-wide">
                            TIENDAS
                        </span>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Categories;
