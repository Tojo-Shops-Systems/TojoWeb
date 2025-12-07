const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

export const Env = {
    showProducts: `${BASE_URL}/api/customers/products`,
    showSpecifyProduct: `${BASE_URL}/api/customers/products?product_code=`,
    allCategories: `${BASE_URL}/api/customers/getAllCategories`,
    showProductWithCategory: `${BASE_URL}/api/customers/products?category_id=`,
    loginCustomer: `${BASE_URL}/api/auth/loginCustomer`,
    registerCustomer: `${BASE_URL}/api/auth/registerCustomer`,
    login: `${BASE_URL}/api/auth/login`,
    logout: `${BASE_URL}/api/auth/logout`,
    logueado: `${BASE_URL}/api/logueado`,
};