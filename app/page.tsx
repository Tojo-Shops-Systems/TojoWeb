'use client';

import Header from "../shared/components/header/header";
import Categories from "../shared/components/categories/categories";
import Footer from "../shared/components/footer/footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Env } from "../env";
import { Product } from "../shared/types/types";
import ProductPanel from "../shared/components/product/product";

interface ApiResponse {
  result: boolean;
  msg: string;
  data: Product[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductCode, setSelectedProductCode] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(Env.showProducts);
        const data: ApiResponse = await response.json();
        if (data.result) {
          const mappedProducts = data.data.map((item: any) => ({
            ...item,
            price: item.product_price !== undefined ? item.product_price : item.price
          }));
          setProducts(mappedProducts);
          setAllProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productCode: string) => {
    setSelectedProductCode(productCode);
    setIsPanelOpen(true);
  };

  const handleCategoryClick = async (categoryId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${Env.showProductWithCategory}${categoryId}`);

      if (response.status === 404) {
        setProducts([]);
        return;
      }

      const data: ApiResponse = await response.json();
      if (data.result) {
        // Map the response to ensure 'price' is available
        const mappedProducts = data.data.map((item: any) => ({
          ...item,
          price: item.product_price !== undefined ? item.product_price : item.price
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      // Optionally set products to empty on error too, or keep previous
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header products={allProducts} onProductClick={handleProductClick} />
      <Categories onCategoryClick={handleCategoryClick} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-gray-50 rounded-full p-6 mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos disponibles</h3>
            <p className="text-gray-500 max-w-md">
              Por el momento no tenemos productos en esta categoría. ¡Pronto añadiremos más novedades!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 hover:shadow-lg transition-shadow rounded-lg bg-white group cursor-pointer"
                onClick={() => handleProductClick(product.product_code)}
              >
                {/* Product Image */}
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.product_url_image}
                    alt={product.productName}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Product Name */}
                <h3 className="text-gray-600 text-sm font-medium text-center mb-2 line-clamp-2 h-10">
                  {product.productName}
                </h3>

                {/* Product Code */}
                <p className="text-gray-400 text-xs mb-3">{product.product_code}</p>

                {/* Price */}
                <p className="text-blue-500 text-lg font-bold mb-4">
                  ${product.price ? product.price.toFixed(2) : '0.00'}
                </p>

                {/* Add to Cart Button */}
                <button className="w-full py-2 px-4 border border-blue-500 text-blue-500 text-xs font-bold rounded hover:bg-blue-500 hover:text-white transition-colors uppercase">
                  Añadir al carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <ProductPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        productCode={selectedProductCode}
      />
    </div>
  );
}
