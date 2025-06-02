import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import EditProductModal from "./ProductsComponents/EditProductModal";
import LayoutAdminPrincipal from "../Layout/LayoutAdminPrincipal";
import CardsRender from "./ProductsComponents/CardsRender";
import type { Product } from "@/types/product";

export default function ProductsCrud() {
  const [products, setProducts] = useState<Product[]>([]);
  const [LogError, setLogError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const url = import.meta.env.VITE_API_URL;

  const handleResponse = useCallback(async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${url}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setLogError("Failed to fetch data");
      }

      setLogError("");

      const data = await response.json();

      const product = data.products;
      setProducts(product);
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [url]);



  useEffect(() => {
    handleResponse();
  }, [handleResponse]);

  return (
    <LayoutAdminPrincipal section="Our Products" error={LogError}>
      
      <div className="flex gap-8 flex-wrap mb-8 px-6 justify-center">
        <CardsRender
        products={products}
        setSelectedProduct={setSelectedProduct}
        setShowModal={setShowModal}
        />

        {showModal && (
          <EditProductModal
           reloadAll={handleResponse}
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </LayoutAdminPrincipal>
  );
}
