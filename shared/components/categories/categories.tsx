'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Plus, MapPin } from 'lucide-react';
import { Env } from '../../../env';
import { Category } from '../../types/types';

interface ApiResponse {
    result: boolean;
    msg: string;
    data: Category[];
}

interface CategoriesProps {
    onCategoryClick: (categoryId: string) => void;
}

const Categories = ({ onCategoryClick }: CategoriesProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);

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
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const mainCategories = categories.slice(0, 6);
    const moreCategories = categories.slice(6);

    if (loading) return null; // Or a skeleton loader

    return (
        <div className="hidden md:block w-full bg-white border-b border-gray-100 py-6 mt-4 transition-all duration-300 ease-in-out">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex flex-col gap-4">

                    {/* Top Row: Main Categories + Actions */}
                    <div className="flex items-center justify-center gap-8">

                        {/* Main Categories */}
                        {mainCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryClick(cat.id)}
                                className="flex items-center gap-2 group whitespace-nowrap"
                            >
                                <span className="text-sm font-medium text-gray-600 group-hover:text-red-600 transition-colors uppercase tracking-wide">
                                    {cat.category_name}
                                </span>
                            </button>
                        ))}

                        {/* Toggle Button */}
                        {moreCategories.length > 0 && (
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="flex items-center gap-2 group whitespace-nowrap"
                            >
                                <span className="text-sm font-medium text-gray-600 group-hover:text-red-600 transition-colors uppercase tracking-wide">
                                    {showMore ? 'MENOS CATEGORÍAS' : 'MÁS CATEGORÍAS'}
                                </span>
                                <Plus className={`w-4 h-4 text-red-600 transition-transform duration-300 ${showMore ? 'rotate-45' : 'rotate-0'}`} strokeWidth={2.5} />
                            </button>
                        )}

                        {/* Stores Link */}
                        <Link href="/stores" className="flex items-center gap-2 group whitespace-nowrap">
                            <MapPin className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            <span className="text-sm font-medium text-red-600 group-hover:text-red-700 transition-colors uppercase tracking-wide">
                                TIENDAS
                            </span>
                        </Link>

                    </div>

                    {/* Expandable Section for More Categories */}
                    <div className={`flex flex-col pt-4 border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${showMore ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        {moreCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryClick(cat.id)}
                                className="flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group w-full"
                            >
                                <div className="flex items-center gap-3">
                                    {/* Small grid icon placeholder matching the image */}
                                    <div className="w-2 h-2 bg-red-600 rounded-sm grid grid-cols-2 gap-[1px]">
                                        <div className="bg-white rounded-[0.5px]"></div>
                                        <div className="bg-white rounded-[0.5px]"></div>
                                        <div className="bg-white rounded-[0.5px]"></div>
                                        <div className="bg-white rounded-[0.5px]"></div>
                                    </div>
                                    <span className="text-sm font-bold text-red-600 group-hover:text-red-700 uppercase tracking-wide">
                                        {cat.category_name}
                                    </span>
                                </div>
                                <Plus className="w-4 h-4 text-red-600 group-hover:text-red-700 -rotate-90" strokeWidth={2.5} />
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Categories;
