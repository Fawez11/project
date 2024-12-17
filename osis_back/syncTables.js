import database from "./config/database.js";
import models from "./App/models/models.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const syncModels = async (model, modelName) => {
  try {
    // await model.sync({ force: true });
    // console.log(`${modelName} table synced without interference.`);
    // await delay(150); // Prevents interference
  } catch (error) {
    console.error(`Error syncing ${modelName} table:`, error);
  }
};

(async () => {
  try {
    console.log("Authenticating database connection...");
    await database.authenticate();
    console.log("Database connected.");

    // Models to sync with their table names
    const modelsToSync = [
      { model: models.User, name: "User" },
      { model: models.Category, name: "category" },
      { model: models.SubCategory, name: "subCategory" },
      { model: models.SubSubCategory, name: "subSubCategory" },
      { model: models.Product, name: "product" },
      { model: models.Partner, name: "partner" },
      { model: models.Characteristic, name: "characteristic" },
      { model: models.SubCharacteristic, name: "subCharacteristic" },
      { model: models.Media, name: "media" },
      { model: models.Cart, name: "cart" },
      { model: models.Slider, name: "slider" },
      { model: models.Order, name: "order" },
      {
        model: models.ProductSubCharacteristic,
        name: "ProductSubCharacteristic",
      },
    ];

    for (const { model, name } of modelsToSync) {
      await syncModels(model, name);
    }

    console.log("All tables synced successfully!");
  } catch (error) {
    console.error("Error during database sync:", error);
  }
})();
