import axios from "axios";
import { useEffect, useState } from "react";
import CustomTable from "../../components/utils/customTable/CustomTable";
import { EditIcon } from "../../components/svgComponenents/EditIcon";
import CreateCategoryModal from "../../components/createCategoryModals/CreateCategoryModal";
import UpdateCategoryModal from "../../components/updateCategoryModals/UpdateCategoryModal";
import DisableConfirmationModal from "../../components/confirmationModals/DisableConfirmationModal";
import DeleteConfirmationModal from "../../components/confirmationModals/DeleteConfirmationModal";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [categoriesNames, setCategoriesNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [password, setPassword] = useState<string>("");
  const [incorrectPasswordError, setIncorrectPasswordError] =
    useState<any>(null);
  const [newCategory, setNewCategory] = useState({
    title: "",
    icon: null as File | null,
  }); // New state for category creation
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [displayedIcon, setDisplayedIcon] = useState<string | null>(null);
  const [updatedIcon, setUpdatedIcon] = useState<File | null>(null);
  const [iconSlotStyle, setIconSlotStyle] = useState<any>({
    width: "15%",
    height: "5%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    zIndex: 1001,
  });

  const DOMAIN_NAME = "http://localhost:5000";
  const routes = [{ name: "Catégories", ref: "/categories", active: true }];
  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Catégorie",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Icône",
      selector: (row: any) => (
        <img src={row.icon} alt="icône de catégorie" width={40} height={40} />
      ),
      sortable: false,
    },
    {
      name: "Nombre de sous-catégories",
      selector: (row: any) => row.subCategories.length,
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

  const createRowItem = () => {
    setIsCreateModalOpen(true);
    document.body.style.overflow = "hidden";
    console.log("create modal opened");
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewCategory({ title: "", icon: null });
    setDisplayedIcon(null);
    document.body.style.overflow = "auto";
  };

  const openUpdateModal = (category: any) => {
    setSelectedCategory(category);
    setUpdatedIcon(null); //ensure that the previous icon is not displayed
    setIsUpdateModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCategory(null);
    setUpdatedIcon(null);
    setDisplayedIcon(null);
    document.body.style.overflow = "auto";
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

  const handleCreateIconChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewCategory((prev) => ({ ...prev, icon: file }));
      setDisplayedIcon(URL.createObjectURL(file));
    }
  };

  const handleUpdateIconChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUpdatedIcon(file);
      setDisplayedIcon(URL.createObjectURL(file));
    }
  };

  const handleCreate = async () => {
    try {
      // Prepare the updated category object with the icon URL or ID returned from the upload
      let body: any = {
        title: newCategory.title,
        icon: "Loading...",
      };
      if (categoriesNames.includes(newCategory.title.toLowerCase())) return; // Check if the new title already exists
      // Send the body first
      const response = await axios.post(
        `${DOMAIN_NAME}/api/category/add`,
        body
      );
      body = { ...body, id: response.data.category.id };
      console.log("body 1: ", body);
      // then we send the file (form-data)
      // Create a FormData object for the file
      const formData = new FormData();
      if (newCategory.icon) {
        formData.append("image", newCategory.icon); // Assuming updatedIcon is a File object
      }
      // Send the file (icon) first
      const uploadResponse = await axios.patch(
        `${DOMAIN_NAME}/api/category/update/${body.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      body = {
        ...body,
        icon: uploadResponse.data.iconPath,
        subCategories: [],
        createdAt: new Date().toISOString(),
      };

      // Update the state
      setCategories([body, ...categories]);

      // Close the modal
      closeCreateModal();
    } catch (err) {
      console.error("error", err);
    }
  };

  const handleUpdate = async () => {
    try {
      // Create a FormData object for the file
      const formData = new FormData();
      if (updatedIcon) {
        formData.append("file", updatedIcon); // Assuming updatedIcon is a File object
      }
      // Send the file (icon) first
      const uploadResponse = await axios.patch(
        `${DOMAIN_NAME}/api/category/update/${selectedCategory.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Prepare the updated category object with the icon URL or ID returned from the upload
      const updatedCategory = {
        ...selectedCategory,
        title: updatedTitle,
        icon: uploadResponse.data.iconPath, // Adjust based on your API's response
      };

      if (categoriesNames.includes(updatedTitle.toLowerCase())) return; // Check if the new title already exists

      // Send the rest of the data
      await axios.patch(
        `${DOMAIN_NAME}/api/category/update/${selectedCategory.id}`,
        updatedCategory
      );

      // Update the state
      setCategories(
        categories.map((category: any) => {
          if (category.id === selectedCategory.id) {
            return updatedCategory;
          }
          return category;
        })
      );

      // Close the modal
      closeUpdateModal();
    } catch (err) {
      console.error("error", err);
    }
  };

  const handleDisable = async (selectedRows: any) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/category/handleDisable`, {
        categoryIds: ids,
      });
      setCategories((prev) => {
        const updatedCategories = [...prev];
        updatedCategories.forEach((category) => {
          if (ids.includes(category.id)) {
            category.disabled = true;
          }
        });
        return updatedCategories;
      });
      console.log(ids, "disabled");
      closeDisableModal();
    } catch (error) {
      console.error("Error disabling categories:", error);
    }
  };

  const handleEnable = async () => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/category/handleEnable`, {
        categoryIds: ids,
      });
      setCategories((prev) => {
        const updatedCategories = [...prev];
        updatedCategories.forEach((category) => {
          if (ids.includes(category.id)) {
            category.disabled = false;
          }
        });
        return updatedCategories;
      });
      console.log(ids, "enabled");
    } catch (error) {
      console.error("Error enabling categories:", error);
    }
  };

  const handleDelete = async (selectedRows: any) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.delete(`${DOMAIN_NAME}/api/category/delete`, {
        data: { ids, password }, // Use `data` for DELETE requests in Axios
      });
      const newCategories = categories.filter(
        (category) => !ids.includes(category.id)
      );
      setIncorrectPasswordError(null);
      setCategories(newCategories);
      setCategoriesNames(
        newCategories.map((category) => category.title.toLowerCase())
      );
      setSelectedRows([]);
      closeDeleteModal();
    } catch (error: any) {
      if (error.status === 401) {
        const errorMessage = JSON.parse(error.request.responseText).message;
        return setIncorrectPasswordError(errorMessage);
      }
      console.error("Error deleting categories:", error);
    }
  };

  useEffect(() => {
    document.title = "Catégories";
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${DOMAIN_NAME}/api/category/getAllWithSubCategories`
    );
    setCategories(response.data);
    setIsLoading(false);
    setCategoriesNames(
      response.data.map((category: any) => category.title.toLowerCase())
    );
  };

  const filterCategories = (category: any, query: string) =>
    category.title.toLowerCase().includes(query.toLowerCase());

  return (
    <>
      <CustomTable
        columns={columns}
        data={categories}
        filteredData={filteredCategories}
        setFilteredData={setFilteredCategories}
        rowNavigation="categories"
        filterLogic={filterCategories}
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

      {isDisableModalOpen && (
        <DisableConfirmationModal
          target="catégories"
          closeDisableModal={closeDisableModal}
          handleDisable={() => handleDisable(selectedRows)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          target="catégories"
          closeDeleteModal={closeDeleteModal}
          handleDelete={() => handleDelete(selectedRows)}
          password={password}
          setPassword={setPassword}
          incorrectPasswordError={incorrectPasswordError}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateCategoryModal
          setIconSlotStyle={setIconSlotStyle}
          iconSlotStyle={iconSlotStyle}
          displayedIcon={displayedIcon}
          handleUpdateIconChange={handleUpdateIconChange}
          selectedCategory={selectedCategory}
          setUpdatedTitle={setUpdatedTitle}
          closeUpdateModal={closeUpdateModal}
          handleUpdate={handleUpdate}
          updatedIcon={updatedIcon}
          categoriesNames={categoriesNames}
          updatedTitle={updatedTitle}
        />
      )}
      {isCreateModalOpen && (
        <CreateCategoryModal
          setIconSlotStyle={setIconSlotStyle}
          iconSlotStyle={iconSlotStyle}
          handleCreateIconChange={handleCreateIconChange}
          selectedCategory={selectedCategory}
          setNewCategory={setNewCategory}
          closeCreateModal={closeCreateModal}
          newCategory={newCategory}
          categoriesNames={categoriesNames}
          handleCreate={handleCreate}
        />
      )}
    </>
  );
};

export default Categories;
