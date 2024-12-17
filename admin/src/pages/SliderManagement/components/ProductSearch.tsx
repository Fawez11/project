import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { Product } from "../types";
import axios from "axios";
interface ProductSearchProps {
  onProductSelect: (product: Product | null) => void;
  initialProduct?: Product | null;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  onProductSelect,
  initialProduct,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialProduct || null
  );

  // Add effect to reset selected product when initialProduct changes
  useEffect(() => {
    setSelectedProduct(initialProduct || null);
    setSearch("");
    setProducts([]);
  }, [initialProduct]);

  const searchProducts = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/product/searchOne?query=${query}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    searchProducts(search);
  }, [search, searchProducts]);

  const handleSelect = (product: Product | null) => {
    setSelectedProduct(product);
    onProductSelect(product);
    setSearch("");
    setProducts([]);
  };

  return (
    <div className="position-relative">
      <label htmlFor="productSearch" className="form-label">
        Produit associé
      </label>

      {selectedProduct ? (
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1 p-2 border rounded">
            {selectedProduct.name}
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleSelect(null)}
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="form-control"
            id="productSearch"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading && (
            <div className="position-absolute end-0 top-50 me-2">
              <div className="spinner-border spinner-border-sm text-primary" />
            </div>
          )}

          {products.length > 0 && (
            <div className="position-absolute w-100 mt-1 shadow-sm border rounded bg-white z-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="w-100 text-start btn btn-light border-0 p-2 hover-bg-light"
                  onClick={() => handleSelect(product)}
                >
                  {product.name}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductSearch;
