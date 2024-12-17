import models from "../models/models.js";
const { Partner, Product } = models;

// Function to add a new partner
const addPartner = async (req, res) => {
  try {
    const { body, file } = req;
    const { name, logo } = body;
    const partner = await Partner.create({
      name,
      logo: file ? `${DOMAIN_NAME}/api/uploads/${file?.filename}` : logo, //if it takes null as a value the default value from the model will be taken wich is noCategoryIcon.jpg
    });
    res.status(201).json({ message: "Partner created", partner });
  } catch (error) {
    res.status(500).json({ message: "Error creating partner", error });
  }
};

// Function to get all partners
const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
      include: [{ model: Product, as: "products" }],
    });
    return res.status(200).json(partners.map((partner) => partner.toJSON())); // Send partners in the response
  } catch (error) {
    console.error("Error fetching partners:", error);
    return res.status(500).json({ error: "Error fetching partners" }); // Send an error response
  }
};

// Function to update a partner
const updatePartner = async (req, res) => {
  try {
    const { body, params, file } = req;
    const { id } = params;
    const { DOMAIN_NAME } = process.env;
    const updatedBody = file
      ? { ...body, logo: `${DOMAIN_NAME}/api/uploads/${file?.filename}` }
      : body;

    const partner = await Partner.findByPk(id);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    await partner.update(updatedBody);
    res.status(200).json({ message: "Partner updated successfully", partner });
  } catch (error) {
    console.error("Error updating partner:", error);
    res
      .status(500)
      .json({ message: "Error updating partner", error: error.message });
  }
};

// Function to delete a partner
const deletePartner = async (req, res) => {
  const { id } = req.params; // Extract partner ID from request parameters
  try {
    const deleted = await Partner.destroy({ where: { id } });

    if (deleted) {
      console.log("Partner deleted successfully");
      return res.status(204).send(); // Send no content response
    }
    console.log("Partner not found");
    return res.status(404).json({ error: "Partner not found" }); // Send a not found response
  } catch (error) {
    console.error("Error deleting partner:", error);
    return res.status(500).json({ error: "Error deleting partner" }); // Send an error response
  }
};

const handleDisable = async (req, res) => {
  const { body } = req;
  const { partnerIds } = body; // Assume IDs are sent in the request body
  if (!Array.isArray(partnerIds) || partnerIds.length === 0) {
    return res.status(400).json({ message: "Invalid or missing partner IDs" });
  }

  // Fetch all categories with the given IDs
  const partnersFetched = await Partner.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      id: partnerIds,
      disabled: false, // Only fetch categories that are currently enabled
    },
  });

  // Update the `disabled` attribute to `true` for the fetched categories
  await Promise.all(
    partnersFetched.map((partner) => partner.update({ disabled: true }))
  );

  const productsFetched = await Product.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      partnerId: partnersFetched.map((partner) => partner.id),
    },
  });

  await Promise.all(
    productsFetched.map((product) => product.update({ disabled: true }))
  );

  res.status(200).json({
    message: "Partners disabled successfully",
    disabledPartners: partnersFetched.map((partner) => partner.id),
  });
};

const handleEnable = async (req, res) => {
  const { body } = req;
  const { partnerIds } = body; // Assume IDs are sent in the request body
  if (!Array.isArray(partnerIds) || partnerIds.length === 0) {
    return res.status(400).json({ message: "Invalid or missing partner IDs" });
  }

  // Fetch all categories with the given IDs
  const partnersFetched = await Partner.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      id: partnerIds,
      disabled: true, // Only fetch categories that are currently disabled
    },
  });

  if (partnersFetched.length === 0) {
    return res.status(404).json({ message: "No partners found to enable" });
  }

  // Update the `disabled` attribute to `false` for the fetched categories
  await Promise.all(
    partnersFetched.map((partner) => partner.update({ disabled: false }))
  );

  const productsFetched = await Product.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      partnerId: partnersFetched.map((partner) => partner.id),
    },
  });

  await Promise.all(
    productsFetched.map((product) => product.update({ disabled: false }))
  );

  res.status(200).json({
    message: "Partners enabled successfully",
    enabledPartners: partnersFetched.map((partner) => partner.id),
  });
};

export {
  addPartner,
  getAllPartners,
  updatePartner,
  deletePartner,
  handleDisable,
  handleEnable,
};
