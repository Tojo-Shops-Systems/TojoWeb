'use client';

import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
    const { cart, loading } = useCart();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-700">
                        <ShoppingCart className="w-6 h-6" />
                        <h2 className="text-xl font-medium">Carrito</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium"
                    >
                        Cerrar
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="h-full flex flex-col p-4 pb-20 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        </div>
                    ) : cart && cart.items && cart.items.length > 0 ? (
                        <div className="space-y-4">
                            {/* Items mapping would go here. For now validation of empty vs populated */}
                            {cart.items.map((item, index) => (
                                <div key={index} className="flex gap-4 border-b border-gray-100 pb-4">
                                    <div className="font-medium">Producto ID: {item.product_id}</div>
                                    <div className="text-gray-500">Cantidad: {item.quantity || 1}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <p className="text-gray-900 font-medium">No hay productos en tu carrito</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
