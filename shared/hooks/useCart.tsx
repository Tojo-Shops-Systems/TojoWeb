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

    // Fetch cart when customerId is available
    useEffect(() => {
        if (!customerId) return;

        const fetchCart = async () => {
            try {
                const response = await fetch(`${Env.getCart}?customer_id=${customerId}`, {
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.result) {
                    setCart(data.data);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, [customerId]);

    const createCart = async () => {
        if (!customerId) return null;
        try {
            const response = await fetch(Env.createCart, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_id: customerId, items: [] }),
                credentials: 'include'
            });
            const data = await response.json();
            if (data.result) {
                setCart(data.data);
                return data.data;
            }
        } catch (error) {
            console.error("Error creating cart:", error);
        }
        return null;
    };

    const addToCart = async (productId: string | number) => {
        if (!customerId) {
            alert("Por favor inicia sesión para agregar productos al carrito");
            return;
        }

        setLoading(true);
        try {
            // Try to add product
            const response = await fetch(Env.addProductToCart, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_id: customerId, product_id: productId }),
                credentials: 'include'
            });

            const data = await response.json();

            if (data.result) {
                setCart(data.data);
                alert("Producto agregado al carrito");
            } else if (response.status === 404) {
                // Cart not found, try to create it then add product
                const newCart = await createCart();
                if (newCart) {
                    // Retry add
                    const retryResponse = await fetch(Env.addProductToCart, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ customer_id: customerId, product_id: productId }),
                        credentials: 'include'
                    });
                    const retryData = await retryResponse.json();
                    if (retryData.result) {
                        setCart(retryData.data);
                        alert("Producto agregado al carrito");
                    }
                }
            } else {
                alert(data.msg || "Error al agregar al carrito");
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
