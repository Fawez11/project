import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../../components/confirmationModals/DeleteConfirmationModal";
import DisableConfirmationModal from "../../components/confirmationModals/DisableConfirmationModal";
import CustomTable from "../../components/utils/customTable/CustomTable";
import { EditIcon } from "../../components/svgComponenents/EditIcon";
import axios from "axios";
import UpdatePartnerModal from "../../components/updatePartnerModal/UpdatePartnerModal";
import CreatePartnerModal from "../../components/createPartnerModal/CreatePartnerModal";

const PartnerList = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [incorrectPasswordError, setIncorrectPasswordError] =
    useState<any>(null);
  const [logoSlotStyle, setLogoSlotStyle] = useState<any>({
    width: "15%",
    height: "5%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    zIndex: 1001,
  });
  const [displayedLogo, setDisplayedLogo] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [updatedName, setUpdatedName] = useState<string>("");
  const [updatedLogo, setUpdatedLogo] = useState<File | null>(null);
  const [newPartner, setNewPartner] = useState<any>({
    name: "",
    logo: null as File | null,
  });
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPartners, setFilteredPartners] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [partnersNames, setPartnersNames] = useState<any[]>([]);
  const DOMAIN_NAME = "http://localhost:5000";

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Nom du partenaire",
      selector: (row: any) => <span title={row.name}>{row.name}</span>,
      sortable: true,
    },
    {
      name: "Logo",
      selector: (row: any) => (
        <img src={`${DOMAIN_NAME}/${row.logo}`} alt={row.name} />
      ),
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

  const routes = [{ name: "Partenaires", ref: "/partners", active: true }];

  const filterPartners = (partner: any, query: string) =>
    partner.name.toLowerCase().includes(query.toLowerCase());

  const createRowItem = () => {
    setIsCreateModalOpen(true);
    document.body.style.overflow = "hidden";
    console.log("create modal opened");
  };

  const openUpdateModal = (partner: any) => {
    setSelectedPartner(partner);
    setUpdatedLogo(null); //ensure that the previous icon is not displayed
    setIsUpdateModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleEnable = async () => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/partner/handleEnable`, {
        partnerIds: ids,
      });
      setPartners((prev) => {
        const updatedPartners = [...prev];
        updatedPartners.forEach((partner) => {
          if (ids.includes(partner.id)) {
            partner.disabled = false;
          }
        });
        return updatedPartners;
      });
      console.log(ids, "enabled");
    } catch (error) {
      console.error("Error enabling categories:", error);
    }
  };

  const handleDisable = async (selectedRows: any) => {
    try {
      const ids = selectedRows.map((row: any) => row.id);
      await axios.patch(`${DOMAIN_NAME}/api/partner/handleDisable`, {
        partnerIds: ids,
      });
      setPartners((prev) => {
        const updatedPartners = [...prev];
        updatedPartners.forEach((partner) => {
          if (ids.includes(partner.id)) {
            partner.disabled = true;
          }
        });
        return updatedPartners;
      });
      console.log(ids, "disabled");
      closeDisableModal();
    } catch (error) {
      console.error("Error disabling partners:", error);
    }
  };

  const handleDelete = (selectedRows: any) => {
    console.log("delete partner", selectedRows);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPassword("");
    setIncorrectPasswordError(null);
    document.body.style.overflow = "auto";
  };

  const closeDisableModal = () => {
    setIsDisableModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewPartner({ name: "", logo: null as File | null });
    setDisplayedLogo(null);
    document.body.style.overflow = "auto";
  };

  const handleUpdateLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUpdatedLogo(file);
      setDisplayedLogo(URL.createObjectURL(file));
    }
  };

  const handleCreateLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPartner((prev: any) => ({ ...prev, logo: file }));
      setDisplayedLogo(URL.createObjectURL(file));
    }
    console.log("newPartner: ", { ...newPartner, logo: file });
  };

  const handleUpdate = async () => {
    try {
      // Create a FormData object for the file
      const formData = new FormData();
      if (updatedLogo) {
        formData.append("file", updatedLogo); // Assuming updatedIcon is a File object
      }
      // Send the file (icon) first
      const uploadResponse = await axios.patch(
        `${DOMAIN_NAME}/api/partner/update/${selectedPartner.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("uploadResponse: ", uploadResponse);

      // Prepare the updated category object with the icon URL or ID returned from the upload
      const updatedPartner = {
        ...selectedPartner,
        name: updatedName ? updatedName : selectedPartner.name,
        logo: uploadResponse.data.partner.logo, // Adjust based on your API's response
      };

      if (partnersNames.includes(updatedName.toLowerCase())) return; // Check if the new title already exists

      // Send the rest of the data
      await axios.patch(
        `${DOMAIN_NAME}/api/partner/update/${selectedPartner.id}`,
        updatedPartner
      );

      // Update the state
      setPartners(
        partners.map((partner: any) => {
          if (partner.id === selectedPartner.id) {
            return updatedPartner;
          }
          return partner;
        })
      );

      // Close the modal
      closeUpdateModal();
    } catch (err) {
      console.error("error", err);
    }
  };

  const handleCreate = async () => {
    try {
      // Prepare the updated category object with the icon URL or ID returned from the upload
      let body: any = {
        name: newPartner.name,
        logo: "Loading...",
      };
      if (partnersNames.includes(newPartner.name.toLowerCase())) return; // Check if the new title already exists
      // Send the body first
      const response = await axios.post(`${DOMAIN_NAME}/api/partner/add`, body);
      body = { ...body, id: response.data.partner.id, products: [] };
      console.log("body 1: ", body);
      // then we send the file (form-data)
      // Create a FormData object for the file
      const formData = new FormData();
      if (newPartner.logo) {
        formData.append("file", newPartner.logo); // Assuming updatedIcon is a File object
      }
      // Send the file (icon) first
      const uploadResponse = await axios.patch(
        `${DOMAIN_NAME}/api/partner/update/${body.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("uploadResponse: ", uploadResponse);

      body = {
        ...body,
        logo: uploadResponse.data.partner.logo,
        products: [],
        createdAt: new Date().toISOString(),
      };

      // Update the state
      setPartners([body, ...partners]);

      // Close the modal
      closeCreateModal();
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    document.title = "Partenaires";
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${DOMAIN_NAME}/api/partner/getAll`);
      setPartners(response.data);
      setPartnersNames(
        response.data.map((partner: any) => partner.name.toLowerCase())
      );
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching partners:", err);
    }
  };

  return (
    <>
      <CustomTable
        columns={columns}
        data={partners}
        filteredData={filteredPartners}
        setFilteredData={setFilteredPartners}
        rowNavigation={`partners`}
        filterLogic={filterPartners}
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

      {isUpdateModalOpen && (
        <UpdatePartnerModal
          setLogoSlotStyle={setLogoSlotStyle}
          logoSlotStyle={logoSlotStyle}
          displayedLogo={displayedLogo}
          handleUpdateLogoChange={handleUpdateLogoChange}
          selectedPartner={selectedPartner}
          setUpdatedName={setUpdatedName}
          closeUpdateModal={closeUpdateModal}
          handleUpdate={handleUpdate}
          updatedLogo={updatedLogo}
          partnersNames={partnersNames}
          updatedName={updatedName}
        />
      )}
      {isCreateModalOpen && (
        <CreatePartnerModal
          setLogoSlotStyle={setLogoSlotStyle}
          logoSlotStyle={logoSlotStyle}
          handleCreateLogoChange={handleCreateLogoChange}
          selectedPartner={selectedPartner}
          setNewPartner={setNewPartner}
          closeCreateModal={closeCreateModal}
          newPartner={newPartner}
          partnersNames={partnersNames}
          handleCreate={handleCreate}
        />
      )}
    </>
  );
};

export default PartnerList;
