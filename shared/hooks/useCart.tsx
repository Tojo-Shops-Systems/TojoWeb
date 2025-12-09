import { useState, useEffect, useCallback } from 'react';
import { Env } from '../../env';
import { Product } from '../types/types';

interface Branch {
    branch_id: number;
    branchName: string;
    address: string;
    id: string;
}

interface CartItem {
    product_id: string; // Changed to string as per API example "750..."
    quantity: number;
    name: string;
    price: number;
    image: string;
}

interface CartData {
    id: number;
    customer: number;
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
                // Use getUserInfo as requested
                const response = await fetch(Env.getUserInfo, { credentials: 'include' });
                if (response.ok) {
                    const user = await response.json();
                    // User example: { "id": 2, ... }
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
    // Pass customer_id in query as requested
    const refreshCart = useCallback(async () => {
        if (!customerId) return;
        try {
            const response = await fetch(`${Env.getCart}?customer_id=${customerId}`, {
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

    const addToCart = async (product: Product, quantity: number = 1) => {
        if (!customerId) {
            alert("Por favor inicia sesión para agregar productos al carrito");
            return;
        }

        setLoading(true);
        try {
            // 1. Check if cart exists via Get
            const getResponse = await fetch(`${Env.getCart}?customer_id=${customerId}`, {
                credentials: 'include'
            });

            // If NOT 200 OK, Create it
            if (getResponse.status !== 200) {
                await fetch(Env.createCart, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customer_id: customerId,
                        items: []
                    }),
                    credentials: 'include'
                });
            }

            const payload = {
                customer_id: customerId,
                product_id: product.id,
                product_name: product.productName,
                product_price: product.price,
                product_image: product.product_url_image,
                quantity: quantity
            };
            // 2. Add Product
            const response = await fetch(Env.addProductToCart, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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

    const removeFromCart = async (productId: string | number) => {
        if (!customerId) return;
        setLoading(true);
        try {
            const response = await fetch(Env.removeProductFromCart, {
                method: 'POST', // Usually DELETE but sticking to user snippet if POST was implied or typical in their stack.
                // User said "public function removeProductFromCart(Request $request)" which handles body, suggesting POST.
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_id: String(customerId),
                    product_id: Number(productId)
                }),
                credentials: 'include'
            });
            const data = await response.json();
            if (data.result) {
                // Backend returns the cart model, but it might not have the updated items or full product details joined.
                // It's safer to refresh the cart from the getCart endpoint which guarantees the correct structure.
                await refreshCart();
                alert("Producto eliminado");
            } else {
                alert(data.msg || "Error al eliminar producto");
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const getBranches = async (): Promise<Branch[]> => {
        try {
            const response = await fetch(Env.getBranches);
            const data = await response.json();
            if (data.result) {
                return data.data;
            }
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
        return [];
    };

    const placeOrder = async (branchId: number) => {
        if (!cart || !cart.id || !customerId) return { success: false, msg: "Datos de carrito faltantes" };

        setLoading(true);
        try {
            const payload = {
                data: {
                    id: cart.id,
                    customer: customerId,
                    items: cart.items
                },
                branch_id: branchId
            };

            const response = await fetch(Env.ticket, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.result) {
                setCart(null); // Cart is destroyed on backend
                return { success: true, ticket: data.data };
            } else {
                return { success: false, msg: data.msg || "Error al procesar el pedido" };
            }
        } catch (error) {
            console.error("Error placing order:", error);
            return { success: false, msg: "Error de conexión al procesar el pedido" };
        } finally {
            setLoading(false);
        }
    };

    return {
        cart,
        loading,
        addToCart,
        removeFromCart,
        refreshCart,
        getBranches,
        placeOrder
    };
};
