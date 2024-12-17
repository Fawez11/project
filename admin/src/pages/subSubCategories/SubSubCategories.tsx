import axios from "axios";
import { useEffect, useState } from "react";
import CustomTable from "../../components/utils/customTable/CustomTable";
import { useLocation } from "react-router-dom";
import { EditIcon } from "../../components/svgComponenents/EditIcon";
import CreateSubSubCategoryModal from "../../components/createCategoryModals/CreateSubSubCategoryModal";
import UpdateSubSubCategoryModal from "../../components/updateCategoryModals/UpdateSubSubCategoryModal";
import DisableConfirmationModal from "../../components/confirmationModals/DisableConfirmationModal";
import DeleteConfirmationModal from "../../components/confirmationModals/DeleteConfirmationModal";

const SubSubCategories = () => {
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]);
  const [filteredSubSubCategories, setFilteredSubSubCategories] = useState<
    any[]
  >([]);
  const [newSubSubCategory, setNewSubSubCategory] = useState<any>({
    title: "",
  });
  const [subSubCategoriesNames, setSubSubCategoriesNames] = useState<string[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSubSubCategory, setSelectedSubSubCategory] =
    useState<any>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
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
      name: "Sous-sous-catégorie",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Nombre de produits",
      selector: (row: any) => row.products.length,
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
        <EditIcon handleClick={() => openUpdateModal(row)} stroke="#000000" />
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
      active: true,
    },
  ];

  useEffect(() => {
    document.title = "Sous-sous-catégories";
    fetchSubSubCategories();
  }, []);

  const fetchSubSubCategories = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${DOMAIN_NAME}/api/subSubCategory/getAll/subCategoryId/${subCategoryId}`
    );
    setSubSubCategories(response.data);
    setIsLoading(false);
    setSubSubCategoriesNames(
      response.data.map((subSubCategory: any) =>
        subSubCategory.title.toLowerCase()
      )
    );
  };

  const filterSubSubCategories = (subSubCategory: any, query: string) =>
    subSubCategory.title.toLowerCase().includes(query.toLowerCase());

  const openUpdateModal = (subSubCategory: any) => {
    setSelectedSubSubCategory(subSubCategory);
    setUpdatedTitle(subSubCategory.title);
    setIsUpdateModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const createRowItem = () => {
    setIsCreateModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewSubSubCategory({ title: "" });
    document.body.style.overflow = "auto";
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPassword("");
    setIncorrectPasswordError(null);
    document.body.style.overflow = "auto";
  };

  const handleUpdate = async () => {
    try {
      const updatedSubSubCategory = {
        ...selectedSubSubCategory,
        title: updatedTitle,
      };

      await axios.patch(
        `${DOMAIN_NAME}/api/subSubCategory/update/${selectedSubSubCategory.id}`,
        updatedSubSubCategory
      );

      setSubSubCategories(
        subSubCategories.map((subSubCategory: any) =>
          subSubCategory.id === selectedSubSubCategory.id
            ? updatedSubSubCategory
            : subSubCategory
        )
      );

      closeUpdateModal();
    } catch (err) {
      console.error("Error updating sub-sub-category:", err);
    }
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedSubSubCategory(null);
    document.body.style.overflow = "auto";
  };

  const closeDisableModal = () => {
    setIsDisableModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleCreate = async (subCategoryId: string | number) => {
    try {
      const response = await axios.post(
        `${DOMAIN_NAME}/api/subSubCategory/add/${subCategoryId}`,
        {
          title: newSubSubCategory.title,
        }
      );
      const body = {
        ...response.data.subSubCategory,
        createdAt: new Date().toISOString(),
        products: [],
      };
      setSubSubCategories((prev) => [body, ...prev]);
      setSubSubCategoriesNames([
        ...subSubCategoriesNames,
        body.title.toLowerCase(),
      ]);
      closeCreateModal();
    } catch (error) {
      console.error("Error creating sub-sub-category:", error);
    }
  };

  const handleDisable = async (selectedRows: any[]) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/subSubCategory/handleDisable`, {
        subSubCategoryIds: ids,
      });
      setSubSubCategories((prev) => {
        const updatedSubSubCategories = [...prev];
        updatedSubSubCategories.forEach((subSubCategory) => {
          if (ids.includes(subSubCategory.id)) {
            subSubCategory.disabled = true;
          }
        });
        return updatedSubSubCategories;
      });
      closeDisableModal();
    } catch (error) {
      console.error("Error disabling sub-sub-categories:", error);
    }
  };

  const handleEnable = async () => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/subSubCategory/handleEnable`, {
        subSubCategoryIds: ids,
      });
      setSubSubCategories((prev) => {
        const updatedSubSubCategories = [...prev];
        updatedSubSubCategories.forEach((subSubCategory) => {
          if (ids.includes(subSubCategory.id)) {
            subSubCategory.disabled = false;
          }
        });
        return updatedSubSubCategories;
      });
    } catch (error) {
      console.error("Error enabling sub-sub-categories:", error);
    }
  };

  const handleDelete = async (selectedRows: any[]) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.delete(`${DOMAIN_NAME}/api/subSubCategory/delete`, {
        data: { ids, password }, // Use `data` for DELETE requests in Axios
      });
      const newSubSubCategories = subSubCategories.filter(
        (subSubCategory) => !ids.includes(subSubCategory.id)
      );
      setIncorrectPasswordError(null);
      setSubSubCategories(newSubSubCategories);
      setSubSubCategoriesNames(
        newSubSubCategories.map((subSubCategory) =>
          subSubCategory.title.toLowerCase()
        )
      );
      setSelectedRows([]);
      closeDeleteModal();
    } catch (error: any) {
      if (error.status === 401) {
        const errorMessage = JSON.parse(error.request.responseText).message;
        return setIncorrectPasswordError(errorMessage);
      }
      console.error("Error deleting sub-sub-categories:", error);
    }
  };

  return (
    <>
      <CustomTable
        columns={columns}
        data={subSubCategories}
        filteredData={filteredSubSubCategories}
        setFilteredData={setFilteredSubSubCategories}
        rowNavigation={`categories/${categoryId}/${subCategoryId}`}
        filterLogic={filterSubSubCategories}
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
          target="sous-sous-catégories"
          closeDeleteModal={closeDeleteModal}
          handleDelete={() => handleDelete(selectedRows)}
          password={password}
          setPassword={setPassword}
          incorrectPasswordError={incorrectPasswordError}
        />
      )}

      {isDisableModalOpen && (
        <DisableConfirmationModal
          target="sous-sous-catégories"
          closeDisableModal={closeDisableModal}
          handleDisable={() => handleDisable(selectedRows)}
        />
      )}

      {isCreateModalOpen && (
        <CreateSubSubCategoryModal
          subCategoryId={subCategoryId}
          setNewSubSubCategory={setNewSubSubCategory}
          closeCreateModal={closeCreateModal}
          newSubSubCategory={newSubSubCategory}
          subSubCategoriesNames={subSubCategoriesNames}
          handleCreate={handleCreate}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateSubSubCategoryModal
          selectedSubSubCategory={selectedSubSubCategory}
          setUpdatedTitle={setUpdatedTitle}
          updatedTitle={updatedTitle}
          closeUpdateModal={closeUpdateModal}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default SubSubCategories;
