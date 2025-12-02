const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

export const Env = {
    showProducts: `${BASE_URL}/api/customers/products`,
};