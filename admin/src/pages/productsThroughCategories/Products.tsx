import axios from "axios";
import { useEffect, useState } from "react";
import CustomTable from "../../components/utils/customTable/CustomTable";
import { useLocation } from "react-router-dom";
import { EditIcon } from "../../components/svgComponenents/EditIcon";
import DisableConfirmationModal from "../../components/confirmationModals/DisableConfirmationModal";
import DeleteConfirmationModal from "../../components/confirmationModals/DeleteConfirmationModal";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [incorrectPasswordError, setIncorrectPasswordError] =
    useState<any>(null);
  const DOMAIN_NAME = "http://localhost:5000"; // Adjust for dotenv
  const location = useLocation();
  const categoryId = location.pathname.split("/")[2];
  const subCategoryId = location.pathname.split("/")[3];
  const subSubCategoryId = location.pathname.split("/")[4];

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Référence",
      selector: (row: any) => row.ref,
      sortable: false,
    },
    {
      name: "Nom du produit",
      selector: (row: any) => <span title={row.name}>{row.name}</span>,
      sortable: true,
    },
    {
      name: "Disponibilité",
      selector: (row: any) =>
        row.availability ? "En Stock" : "Rupture de stock",
      sortable: true,
    },
    {
      name: "Créé le",
      selector: (row: any) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Activé",
      selector: (row: any) => (row.disabled ? "Non" : "Oui"),
      sortable: true,
    },
    {
      name: "Modifier",
      cell: (row: any) => (
        <EditIcon handleClick={() => updateProduct(row)} stroke="#000000" />
      ),
      ignoreRowClick: true,
      allowoverflow: true,
    },
  ];

  const routes = [
    { name: "Catégories", ref: "/categories", active: false },
    {
      name: "Sous-catégories",
      ref: `/categories/${categoryId}`,
      active: false,
    },
    {
      name: "Sous-sous-catégories",
      ref: `/categories/${categoryId}/${subCategoryId}`,
      active: false,
    },
    {
      name: "Produits",
      ref: `/categories/${categoryId}/${subCategoryId}/${subSubCategoryId}`,
      active: true,
    },
  ];

  useEffect(() => {
    document.title = "Produits";
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${DOMAIN_NAME}/api/product/subSubCategory/${subSubCategoryId}`
      );
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const filterProducts = (product: any, query: string) =>
    product.title.toLowerCase().includes(query.toLowerCase());

  const updateProduct = (product: any) => {
    console.log("update product", product);
  };

  const createRowItem = () => {
    console.log("create product");
  };

  const closeDisableModal = () => {
    setIsDisableModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPassword("");
    setIncorrectPasswordError(null);
    document.body.style.overflow = "auto";
  };

  const handleDisable = async (selectedRows: any[]) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      console.log("products ids: ", ids);
      await axios.patch(`${DOMAIN_NAME}/api/product/handleDisable`, {
        productsIds: ids,
      });
      setProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts.forEach((product) => {
          if (ids.includes(product.id)) {
            product.disabled = true;
          }
        });
        return updatedProducts;
      });
      closeDisableModal();
    } catch (error) {
      console.error("Error disabling products:", error);
    }
  };

  const handleEnable = async () => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/product/handleEnable`, {
        productsIds: ids,
      });
      setProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts.forEach((product) => {
          if (ids.includes(product.id)) {
            product.disabled = false;
          }
        });
        return updatedProducts;
      });
    } catch (error) {
      console.error("Error enabling products:", error);
    }
  };

  const handleDelete = async (selectedRows: any[]) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.delete(`${DOMAIN_NAME}/api/product/delete`, {
        data: { ids, password }, // Use `data` for DELETE requests in Axios
      });
      const newProducts = products.filter(
        (product) => !ids.includes(product.id)
      );
      setProducts(newProducts);
      setSelectedRows([]);
      closeDeleteModal();
    } catch (error: any) {
      if (error.status === 401) {
        const errorMessage = JSON.parse(error.request.responseText).message;
        return setIncorrectPasswordError(errorMessage);
      }
      console.error("Error deleting products:", error);
    }
  };

  return (
    <>
      <CustomTable
        columns={columns}
        data={products}
        filteredData={filteredProducts}
        setFilteredData={setFilteredProducts}
        rowNavigation={`products`}
        filterLogic={filterProducts}
        clickableRows={true}
        routes={routes}
        isLoading={isLoading}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        createRowItem={createRowItem}
        handleDisable={() => setIsDisableModalOpen(true)}
        handleEnable={handleEnable}
        handleDelete={() => setIsDeleteModalOpen(true)}
      />

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          target="produits"
          closeDeleteModal={closeDeleteModal}
          handleDelete={() => handleDelete(selectedRows)}
          password={password}
          setPassword={setPassword}
          incorrectPasswordError={incorrectPasswordError}
        />
      )}

      {isDisableModalOpen && (
        <DisableConfirmationModal
          target="produits"
          closeDisableModal={closeDisableModal}
          handleDisable={() => handleDisable(selectedRows)}
        />
      )}
    </>
  );
};

export default Products;
