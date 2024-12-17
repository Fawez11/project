import axios from "axios";
import { useEffect, useState } from "react";
import CustomTable from "../../components/utils/customTable/CustomTable";
import { useLocation } from "react-router-dom";
import { EditIcon } from "../../components/svgComponenents/EditIcon";
import CreateSubCategoryModal from "../../components/createCategoryModals/CreateSubCategoryModal";
import UpdateSubCategoryModal from "../../components/updateCategoryModals/UpdateSubCategoryModal";
import DisableConfirmationModal from "../../components/confirmationModals/DisableConfirmationModal";
import DeleteConfirmationModal from "../../components/confirmationModals/DeleteConfirmationModal";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const [subCategoriesNames, setSubCategoriesNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState<any>({
    title: "",
  });
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [password, setPassword] = useState<string>("");
  const [incorrectPasswordError, setIncorrectPasswordError] =
    useState<any>(null);
  const DOMAIN_NAME = "http://localhost:5000"; // Adjust for dotenv
  const location = useLocation();
  const categoryId = location.pathname.split("/")[2];

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Sous-catégorie",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Nombre de sous-sous-catégories",
      selector: (row: any) => row.subSubCategories.length,
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
    { name: "Sous-catégories", ref: `/categories/${categoryId}`, active: true },
  ];

  useEffect(() => {
    document.title = "Sous-catégories";
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${DOMAIN_NAME}/api/subCategory/getAll/categoryId/${categoryId}`
    );
    console.log("fetched subCategories", response.data);
    setSubCategories(response.data);
    setSubCategoriesNames(
      response.data.map((subCategory: any) => subCategory.title)
    );
    setIsLoading(false);
  };

  const filterSubCategories = (subCategory: any, query: string) =>
    subCategory.title.toLowerCase().includes(query.toLowerCase());

  const handleCreate = async (categoryId: string | number) => {
    try {
      const response = await axios.post(
        `${DOMAIN_NAME}/api/subCategory/add/${categoryId}`,
        {
          title: newSubCategory.title,
        }
      );
      const body = {
        ...response.data.subCategory,
        subSubCategories: [],
        createdAt: new Date().toISOString(),
      };
      setSubCategories((prev) => [body, ...prev]);
      setSubCategoriesNames([
        ...subCategoriesNames,
        newSubCategory.title.toLowerCase(),
      ]);
      setNewSubCategory({ title: "" });
      closeCreateModal();
    } catch (error) {
      console.error("Error creating sub-category:", error);
    }
  };

  const handleDisable = async (selectedRows: any[]) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/subCategory/handleDisable`, {
        subCategoryIds: ids,
      });
      setSubCategories((prev) => {
        const updatedSubCategories = [...prev];
        updatedSubCategories.forEach((subCategory) => {
          if (ids.includes(subCategory.id)) {
            subCategory.disabled = true;
          }
        });
        return updatedSubCategories;
      });
      closeDisableModal();
    } catch (error) {
      console.error("Error disabling categories:", error);
    }
  };

  const handleEnable = async () => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/subCategory/handleEnable`, {
        subCategoryIds: ids,
      });
      setSubCategories((prev) => {
        const updatedSubCategories = [...prev];
        updatedSubCategories.forEach((subCategory) => {
          if (ids.includes(subCategory.id)) {
            subCategory.disabled = false;
          }
        });
        return updatedSubCategories;
      });
    } catch (error) {
      console.error("Error enabling sub-categories:", error);
    }
  };

  const handleDelete = async (selectedRows: any[]) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.delete(`${DOMAIN_NAME}/api/subCategory/delete`, {
        data: { ids, password }, // Use `data` for DELETE requests in Axios
      });
      const newSubCategories = subCategories.filter(
        (subCategory) => !ids.includes(subCategory.id)
      );
      setIncorrectPasswordError(null);
      setSubCategories(newSubCategories);
      setSubCategoriesNames(
        newSubCategories.map((subCategory) => subCategory.title.toLowerCase())
      );
      setSelectedRows([]);
      closeDeleteModal();
    } catch (error: any) {
      if (error.status === 401) {
        const errorMessage = JSON.parse(error.request.responseText).message;
        return setIncorrectPasswordError(errorMessage);
      }
      console.error("Error deleting sub-categories:", error);
    }
  };

  const createRowItem = () => {
    setIsCreateModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const closeDisableModal = () => {
    setIsDisableModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const openUpdateModal = (subCategory: any) => {
    setSelectedSubCategory(subCategory);
    setUpdatedTitle(subCategory.title);
    setIsUpdateModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleUpdate = async () => {
    try {
      const updatedSubCategory = {
        ...selectedSubCategory,
        title: updatedTitle,
      };

      await axios.patch(
        `${DOMAIN_NAME}/api/subCategory/update/${selectedSubCategory.id}`,
        updatedSubCategory
      );

      setSubCategories(
        subCategories.map((subCategory: any) =>
          subCategory.id === selectedSubCategory.id
            ? updatedSubCategory
            : subCategory
        )
      );

      closeUpdateModal();
    } catch (err) {
      console.error("Error updating sub-category:", err);
    }
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedSubCategory(null);
    document.body.style.overflow = "auto";
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPassword("");
    setIncorrectPasswordError(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <CustomTable
        columns={columns}
        data={subCategories}
        filteredData={filteredSubCategories}
        setFilteredData={setFilteredSubCategories}
        rowNavigation={`categories/${categoryId}`}
        filterLogic={filterSubCategories}
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
          target="sous-catégories"
          closeDeleteModal={closeDeleteModal}
          handleDelete={() => handleDelete(selectedRows)}
          password={password}
          setPassword={setPassword}
          incorrectPasswordError={incorrectPasswordError}
        />
      )}

      {isDisableModalOpen && (
        <DisableConfirmationModal
          target="sous-catégories"
          closeDisableModal={closeDisableModal}
          handleDisable={() => handleDisable(selectedRows)}
        />
      )}

      {isCreateModalOpen && (
        <CreateSubCategoryModal
          categoryId={categoryId}
          setNewSubCategory={setNewSubCategory}
          closeCreateModal={closeCreateModal}
          newSubCategory={newSubCategory}
          subCategoriesNames={subCategoriesNames}
          handleCreate={handleCreate}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateSubCategoryModal
          selectedSubCategory={selectedSubCategory}
          setUpdatedTitle={setUpdatedTitle}
          updatedTitle={updatedTitle}
          closeUpdateModal={closeUpdateModal}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default SubCategories;
