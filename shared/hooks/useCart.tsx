import { useState, useEffect, useCallback } from 'react';
import { Env } from '../../env';
import { Product } from '../types/types';

interface CartItem {
    product_id: number;
    quantity: number;
    // Add other relevant fields if needed based on API response
}

interface CartData {
    id: number;
    customer_id: number;
    items: CartItem[];
}

export const useCart = () => {
    const [cart, setCart] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(false);
    const [customerId, setCustomerId] = useState<number | null>(null);

    // Fetch user to get customer_id
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(Env.user, { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    const user = data.result ? data.user : data;
                    if (user && user.id) {
                        setCustomerId(user.id);
                    }
                }
            } catch (error) {
                console.error("Error fetching user for cart:", error);
            }
        };
        fetchUser();
    }, []);

    // Exposed fetch function to allow manual refresh
    const refreshCart = useCallback(async () => {
        if (!customerId) return;
        try {
            const response = await fetch(Env.getCart, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                if (data.result) {
                    setCart(data.data);
                }
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }, [customerId]);

    // Initial fetch on mount/login
    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addToCart = async (productId: string | number) => {
        if (!customerId) {
            alert("Por favor inicia sesión para agregar productos al carrito");
            return;
        }

        setLoading(true);
        try {
            // 1. Check if cart exists via Get
            const getResponse = await fetch(Env.getCart, {
                credentials: 'include'
            });

            // If NOT 200 OK, Create it
            if (getResponse.status !== 200) {
                await fetch(Env.createCart, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: [] }),
                    credentials: 'include'
                });
                // We proceed to add regardless of create result, or assume success/overlap handling by backend
            }

            // 2. Add Product
            const response = await fetch(Env.addProductToCart, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: productId }),
                credentials: 'include'
            });

            const text = await response.text();
            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                console.error("Failed to parse JSON response:", text);
                alert("Error del servidor: Respuesta no válida");
                return;
            }

            if (data.result) {
                setCart(data.data);
                alert("Producto agregado al carrito");
            } else {
                console.warn("Add to cart failure. Raw:", text);
                alert(data.msg || ("Error al agregar al carrito (" + response.status + ")"));
            }

        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Error al agregar al carrito");
        } finally {
            setLoading(false);
        }
    };

    return {
        cart,
        loading,
        addToCart,
        refreshCart
    };
};
