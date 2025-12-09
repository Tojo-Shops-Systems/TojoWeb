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

    // Initialize cart (Create -> Get) when customerId is available
    useEffect(() => {
        if (!customerId) return;

        const initializeCart = async () => {
            // 1. Try to create cart or verify existence
            try {
                const createResponse = await fetch(Env.createCart, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: [] }),
                    credentials: 'include'
                });

                // If 200 (Created) OR 409 (Exists), we proceed to Get.
                if (createResponse.ok || createResponse.status === 409) {
                    await fetchCart();
                } else {
                    console.error("Error creating cart:", createResponse.status);
                    // Attempt fetch anyway as fallback
                    await fetchCart();
                }
            } catch (error) {
                console.error("Error initializing cart:", error);
            }
        };

        const fetchCart = async () => {
            try {
                const response = await fetch(`${Env.getCart}`, {
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
        };

        initializeCart();
    }, [customerId]);

    const addToCart = async (productId: string | number) => {
        if (!customerId) {
            alert("Por favor inicia sesión para agregar productos al carrito");
            return;
        }

        setLoading(true);
        try {
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
        addToCart
    };
};
