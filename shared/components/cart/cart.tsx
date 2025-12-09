'use client';

import { useEffect, useMemo } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types/types';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
    const { cart, loading, refreshCart, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        if (isOpen) {
            refreshCart();
        }
    }, [isOpen, refreshCart]);

    const subtotal = useMemo(() => {
        if (!cart?.items) return 0;
        return cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }, [cart]);

    const handleIncrement = (item: any) => {
        // Construct a partial Product object to satisfy the interface
        const productShim: Product = {
            id: item.product_id,
            product_code: item.product_id,
            productName: item.name,
            product_url_image: item.image,
            price: item.price
        };
        addToCart(productShim, 1);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(price);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-800">
                        <ShoppingCart className="w-6 h-6" />
                        <h2 className="text-xl font-normal text-gray-600">
                            Carrito <span className="text-gray-400 font-light">({cart?.items?.length || 0} artículo{cart?.items?.length !== 1 ? 's' : ''})</span>
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <span className="text-sm font-medium mr-1">Cerrar</span>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {loading && !cart ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00AEEF]"></div>
                        </div>
                    ) : cart && cart.items && cart.items.length > 0 ? (
                        <div className="space-y-6">
                            {cart.items.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 flex-shrink-0 bg-white border border-gray-100 rounded-lg p-2 flex items-center justify-center relative overflow-hidden group">
                                        {/* Red triangle banner mockup inspired by image if needed, keeping simple standard design first */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="pr-4">
                                                <p className="text-xs text-gray-400 mb-1 line-clamp-1">{item.name.split(' ').slice(0, 2).join(' ')}...</p> {/* Trying to mimic the model number look if possible, or just name truncated */}
                                                <h3 className="text-sm text-gray-700 font-medium leading-tight line-clamp-2">
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product_id)}
                                                className="text-gray-400 hover:text-red-500 flex items-center text-xs gap-1 whitespace-nowrap"
                                            >
                                                <X className="w-3 h-3" />
                                                <span className="underline decoration-1">Eliminar</span>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 mt-auto">
                                            <button className="text-blue-500 text-xs font-semibold flex items-center gap-1 hover:underline">
                                                VER DETALLES <span className="text-[10px]">▼</span>
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end mt-3">
                                            {/* Quantity Control */}
                                            <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 h-8 bg-white">
                                                <button
                                                    className="w-6 h-full flex items-center justify-center text-blue-400 hover:bg-gray-50 rounded-full disabled:opacity-30"
                                                    disabled
                                                    title="Disminuir no disponible"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm text-gray-600 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncrement(item)}
                                                    className="w-6 h-full flex items-center justify-center text-blue-400 hover:bg-gray-50 rounded-full"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <div className="text-xl font-semibold text-gray-900">
                                                    {formatPrice(item.price)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                            <ShoppingCart className="w-12 h-12 text-gray-300 mb-2" />
                            <p>Tu carrito está vacío</p>
                            <button onClick={onClose} className="text-[#00AEEF] mt-2 hover:underline">
                                Empezar a comprar
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart && cart.items && cart.items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-white">
                        <div className="text-right mb-2">
                            <p className="text-xs text-green-500 font-medium">
                                Recibe $0.00 tu próxima compra
                            </p>
                        </div>

                        <div className="flex justify-between items-baseline mb-6">
                            <span className="text-2xl font-medium text-gray-900">Subtotal :</span>
                            <span className="text-2xl font-bold text-gray-900">{formatPrice(subtotal)}</span>
                        </div>

                        <button className="w-full bg-[#00AEEF] hover:bg-[#009bd5] text-white font-bold py-3.5 px-4 rounded-full transition-colors mb-4 uppercase tracking-wide">
                            PAGAR AHORA
                        </button>

                        <div className="text-center">
                            <button
                                onClick={onClose}
                                className="text-[#00AEEF] font-medium hover:underline text-sm"
                            >
                                Seguir Comprando
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
