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
