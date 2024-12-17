import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useParams } from "react-router-dom";
import apiEndpoints from "../../../../api/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerticalProductCard from "../../../../components/website/verticalProductBar/verticalProd";
import "./products.css";
import Slider from "@mui/material/Slider";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const ProductPage = () => {
  const { subCategoryId, subSubCategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [characteristics, setCharacteristics] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [selectedSubChars, setSelectedSubChars] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [noProductsMessage, setNoProductsMessage] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [activeFilterRange, setActiveFilterRange] = useState([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [filters, setFilters] = useState({
    isOnSale: false,
    isTopSeller: false,
    inStock: false,
    hasDiscount: false,
  });
  const [expandedSections, setExpandedSections] = useState({
    price: false,
    status: false,
  });

  const fetchProductsBySubCategory = async (subCategoryId) => {
    const subSubCategoriesResponse = await apiEndpoints.getData(
      `/subSubCategory/getAll/subCategory/${subCategoryId}`
    );

    if (!Array.isArray(subSubCategoriesResponse)) return [];

    const productsResponses = await Promise.all(
      subSubCategoriesResponse.map((subSub) =>
        apiEndpoints.getData(`/product/subSubCategory/${subSub.id}`)
      )
    );

    return productsResponses.flat().filter(Boolean);
  };

  const fetchCharacteristics = async (id, type = "subcategory") => {
    try {
      const response = await apiEndpoints.getData(
        `/characteristics/${type}/${id}`
      );
      return response?.characteristics || [];
    } catch (error) {
      console.error("Error fetching characteristics:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let productsData = [];
        let characteristicsData = [];

        if (subCategoryId) {
          productsData = await fetchProductsBySubCategory(subCategoryId);
          characteristicsData = await fetchCharacteristics(subCategoryId);
        } else if (subSubCategoryId) {
          productsData = await apiEndpoints.getData(
            `/product/subSubCategory/${subSubCategoryId}`
          );
          characteristicsData = await fetchCharacteristics(
            subSubCategoryId,
            "subsubcategory"
          );
        }

        setProducts(productsData || []);
        setCharacteristics(characteristicsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setCharacteristics([]);
      } finally {
        setLoading(false);
      }
    };

    if (subCategoryId || subSubCategoryId) {
      fetchData();
    }
  }, [subCategoryId, subSubCategoryId]);

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      let queryParams = new URLSearchParams();

      if (subSubCategoryId) {
        queryParams.append("subSubCategoryId", subSubCategoryId);
      } else if (subCategoryId) {
        queryParams.append("subCategoryId", subCategoryId);
      }

      const minPriceValue = Number(activeFilterRange[0]);
      const maxPriceValue = Number(activeFilterRange[1]);

      if (!isNaN(minPriceValue) && !isNaN(maxPriceValue)) {
        queryParams.append("minPrice", minPriceValue.toString());
        queryParams.append("maxPrice", maxPriceValue.toString());
      }

      const hasActiveFilters = Object.values(filters).some((value) => value);
      if (hasActiveFilters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, "true");
        });
      }

      if (selectedSubChars.length > 0) {
        selectedSubChars.forEach((id) => {
          queryParams.append("subCharacteristics[]", id.toString());
        });
      }

      console.log("Filter query:", queryParams.toString());

      const response = await apiEndpoints.getData(
        `product/filter?${queryParams.toString()}`
      );

      if (response.success) {
        setProducts(response.products || []);
        setNoProductsMessage(
          response.products.length === 0
            ? "Aucun produit ne correspond à vos critères de recherche."
            : ""
        );
      } else {
        throw new Error(response.message || "Error fetching filtered products");
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setProducts([]);
      setNoProductsMessage("Une erreur s'est produite lors de la recherche.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPriceRange = async () => {
    try {
      let endpoint = subSubCategoryId
        ? `/product/priceRange/subSubCategory/${subSubCategoryId}`
        : `/product/priceRange/subCategory/${subCategoryId}`;

      const response = await apiEndpoints.getData(endpoint);

      if (response.success) {
        setMinPrice(response.minPrice);
        setMaxPrice(response.maxPrice);
        setPriceRange([response.minPrice, response.maxPrice]);
        setActiveFilterRange([response.minPrice, response.maxPrice]);
      }
    } catch (error) {
      console.error("Error fetching price range:", error);
    }
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceFilterClick = () => {
    setActiveFilterRange(priceRange);
    fetchFilteredProducts();
  };

  useEffect(() => {
    console.log("Filter effect running");
    console.log("subCategoryId:", subCategoryId);
    console.log("subSubCategoryId:", subSubCategoryId);
    console.log("Selected characteristics:", selectedSubChars);

    const loadProducts = async () => {
      if (!subCategoryId && !subSubCategoryId) return;

      try {
        setLoading(true);
        let productsData;

        if (subSubCategoryId) {
          productsData = await apiEndpoints.getData(
            `product/subSubCategory/${subSubCategoryId}`
          );
        } else {
          const queryParams = new URLSearchParams({
            subCategoryId: subCategoryId,
          });
          const response = await apiEndpoints.getData(
            `product/filter?${queryParams}`
          );
          productsData = response.products || [];
        }

        setProducts(productsData || []);
        setNoProductsMessage("");
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
        setNoProductsMessage(
          "Une erreur s'est produite lors du chargement des produits."
        );
      } finally {
        setLoading(false);
      }
    };

    startTransition(() => {
      loadProducts();
    });
  }, [subCategoryId, subSubCategoryId]);

  useEffect(() => {
    if (subCategoryId || subSubCategoryId) {
      fetchPriceRange();
    }
  }, [subCategoryId, subSubCategoryId]);

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const handleCheckboxChange = (id) => {
    setSelectedSubChars((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((subCharId) => subCharId !== id)
        : [...prev, id];
      return newSelection;
    });
    fetchFilteredProducts();
  };

  const handleFilterChange = (filterName) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      newFilters[filterName] = !prev[filterName];

      if (filterName === "isOnSale" && newFilters.isOnSale) {
        newFilters.isTopSeller = false;
      }
      if (filterName === "isTopSeller" && newFilters.isTopSeller) {
        newFilters.isOnSale = false;
        newFilters.hasDiscount = false;
      }

      if (Object.values(newFilters).every((value) => !value)) {
        resetFilters();
        return newFilters;
      }

      return newFilters;
    });
    fetchFilteredProducts();
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const resetFilters = async () => {
    setFilters({
      isOnSale: false,
      isTopSeller: false,
      inStock: false,
      hasDiscount: false,
    });
    setSelectedSubChars([]);
    setActiveFilterRange([minPrice, maxPrice]);
    setPriceRange([minPrice, maxPrice]);

    try {
      setLoading(true);
      let productsData;

      if (subSubCategoryId) {
        productsData = await apiEndpoints.getData(
          `product/subSubCategory/${subSubCategoryId}`
        );
      } else if (subCategoryId) {
        const queryParams = new URLSearchParams({
          subCategoryId: subCategoryId,
        });
        const response = await apiEndpoints.getData(
          `product/filter?${queryParams}`
        );
        productsData = response.products || [];
      }

      setProducts(productsData || []);
      setNoProductsMessage("");
    } catch (error) {
      console.error("Error resetting products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="product-page" key={subSubCategoryId}>
      <div className="products-container">
        <div className="filter-sidebar">
          <h3>Options de filtrage</h3>

          {/* Price Range Section - Always Open */}
          <div className="filter-section">
            <h4>Plage de prix</h4>
            <div className="price-filter">
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
                valueLabelFormat={(value) => `${value} DT`}
              />
              <div className="price-range-labels">
                <span>{priceRange[0]} DT</span>
                <span>{priceRange[1]} DT</span>
              </div>
              <button
                className="apply-price-filter"
                onClick={handlePriceFilterClick}
              >
                Appliquer le filtre
              </button>
            </div>
          </div>

          {/* Product Status Section - Always Open */}
          <div className="filter-section">
            <h4>État du produit</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={() => handleFilterChange("inStock")}
                />
                <span>En stock</span>
              </label>

              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.isOnSale}
                  onChange={() => handleFilterChange("isOnSale")}
                />
                <span>En solde</span>
              </label>

              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.isTopSeller}
                  onChange={() => handleFilterChange("isTopSeller")}
                />
                <span>Meilleures ventes</span>
              </label>

              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.hasDiscount}
                  onChange={() => handleFilterChange("hasDiscount")}
                />
                <span>Avec réduction</span>
              </label>
            </div>
          </div>

          {/* Existing collapsible characteristics */}
          {characteristics.map((char) => (
            <div
              key={char.id}
              className={`characteristic ${
                expanded === char.id ? "expanded" : ""
              }`}
            >
              <div
                className="characteristic-header"
                onClick={() => toggleExpand(char.id)}
              >
                <span className="characteristic-label">{char.title}</span>
                <ExpandMoreIcon className="expand-icon" />
              </div>

              {expanded === char.id && (
                <div className="sub-characteristics">
                  {(char.subCharacteristics || []).map((subChar) => (
                    <div key={subChar.id} className="sub-characteristic">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedSubChars.includes(subChar.id)}
                          onChange={() => handleCheckboxChange(subChar.id)}
                        />
                        <span>{subChar.title}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="product_wrapper"
          style={{ width: "1000px", margin: "0 auto" }}
        >
          {loading ? (
            <div className="products-loading"></div>
          ) : noProductsMessage ? (
            <div className="no-products-message">
              <i className="fas fa-face-sad-tear"></i>
              <h3>Aucun produit trouvé</h3>
              <p>{noProductsMessage}</p>
              {selectedSubChars.length > 0 && (
                <button
                  className="reset-filters-btn"
                  onClick={resetFilters}
                  style={{
                    display:
                      Object.values(filters).some((value) => value) ||
                      selectedSubChars.length > 0 ||
                      activeFilterRange[0] !== minPrice ||
                      activeFilterRange[1] !== maxPrice
                        ? "block"
                        : "none",
                  }}
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            products.map((product) => (
              <VerticalProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
