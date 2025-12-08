'use client';

import { useEffect, useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Env } from '../../../env';
import { ProductDetail } from '../../types/types';
import { useCart } from '../../hooks/useCart';

interface ProductPanelProps {
    isOpen: boolean;
    onClose: () => void;
    productCode: string | null;
}

interface ApiResponse {
    result: boolean;
    msg: string;
    data: ProductDetail;
}

const ProductPanel = ({ isOpen, onClose, productCode }: ProductPanelProps) => {
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const { addToCart, loading: cartLoading } = useCart();

    useEffect(() => {
        if (isOpen && productCode) {
            const fetchProduct = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${Env.showSpecifyProduct}${productCode}`);
                    const data: ApiResponse = await response.json();
                    if (data.result) {
                        setProduct(data.data);
                    }
                } catch (error) {
                    console.error("Error fetching product details:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        } else {
            // Reset product when closed or code changes to null
            if (!isOpen) {
                const timer = setTimeout(() => setProduct(null), 300); // Wait for animation
                return () => clearTimeout(timer);
            }
        }
    }, [isOpen, productCode]);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Modal Window */}
            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-white z-[70] shadow-2xl rounded-2xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Detalles del Producto</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[80vh] overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : product ? (
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2">
                                <div className="relative w-full aspect-square bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <Image
                                        src={product.product_url_image}
                                        alt={product.product_name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="w-full md:w-1/2 flex flex-col">
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.product_name}</h1>
                                    <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600 mb-4">
                                        Código: {product.product_code}
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-sm text-gray-500 mb-1">Precio</p>
                                        <p className="text-4xl font-bold text-blue-600">${product.product_price.toFixed(2)}</p>
                                    </div>

                                    <div className="prose prose-sm text-gray-600 mb-8">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Descripción</h3>
                                        <p className="leading-relaxed">{product.product_description || "Sin descripción disponible."}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <button
                                    onClick={() => product && addToCart(product.id)}
                                    disabled={cartLoading}
                                    className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {cartLoading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5" />
                                            AÑADIR AL CARRITO
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-12">
                            No se pudo cargar la información del producto.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductPanel;