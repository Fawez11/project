import Cart from "./cart.js";
import Order from "./order.js";
import Category from "./category.js";
import Characteristic from "./characteristic.js";
import Media from "./media.js";
import Partner from "./partner.js";
import Product from "./product.js";
import Slider from "./slider.js";
import SubCategory from "./subCategory.js";
import SubCharacteristic from "./subCharacteristic.js";
import SubSubCategory from "./subSubCategory.js";
import User from "./user.js";
import ProductSubCharacteristic from "./productSubCharacteristic.js";
import { initializeHooks } from "./hooks/initHooks.js";

// Category and SubCategory Associations
Category.hasMany(SubCategory, {
  foreignKey: "categoryId",
  as: "subCategories",
  onDelete: "CASCADE", // Added CASCADE deletion
});
SubCategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
  onDelete: "CASCADE", // Added CASCADE deletion
});

// SubCategory and Characteristic Associations(jdidi add new)
SubCategory.hasMany(Characteristic, {
  foreignKey: "subCategoryId",
  as: "characteristics",
  onDelete: "CASCADE", // Added CASCADE deletion
});
Characteristic.belongsTo(SubCategory);

//!
SubSubCategory.hasMany(Characteristic, {
  foreignKey: "subSubCategoryId",
  as: "SubSubCategorycharacteristics",
  onDelete: "CASCADE", // Added CASCADE deletion
});
Characteristic.belongsTo(SubSubCategory);
//!

// SubCategory and SubSubCategory Associations
SubCategory.hasMany(SubSubCategory, {
  foreignKey: "subCategoryId",
  as: "subSubCategories",
  onDelete: "CASCADE", // Added CASCADE deletion
});
SubSubCategory.belongsTo(SubCategory, {
  foreignKey: "subCategoryId",
  as: "subCategory",
  onDelete: "CASCADE", // Added CASCADE deletion
});

// SubSubCategory and Product Associations
SubSubCategory.hasMany(Product, {
  foreignKey: "subSubCategoryId",
  as: "products",
  onDelete: "CASCADE", // Added CASCADE deletion
});
Product.belongsTo(SubSubCategory, {
  foreignKey: "subSubCategoryId",
  as: "subSubCategory",
  onDelete: "CASCADE", // Added CASCADE deletion
});

// Partner and Product Associations
Partner.hasMany(Product, {
  foreignKey: "partnerId",
  as: "products",
  onDelete: "CASCADE", // Added CASCADE deletion
});
Product.belongsTo(Partner, {
  foreignKey: "partnerId",
  as: "partner",
  onDelete: "CASCADE", // Added CASCADE deletion
});

// Product and SubCharacteristic Associations
Product.belongsToMany(SubCharacteristic, {
  through: ProductSubCharacteristic,
  foreignKey: "productId",
  as: "characteristics",
  onDelete: "CASCADE", // Added CASCADE deletion
});
SubCharacteristic.belongsToMany(Product, {
  through: ProductSubCharacteristic,
  foreignKey: "subCharacteristicId",
  as: "products",
  onDelete: "CASCADE", // Added CASCADE deletion
});

// Characteristic and SubCharacteristic Associations
Characteristic.hasMany(SubCharacteristic, {
  foreignKey: "characteristicId",
  as: "subCharacteristics",
  onDelete: "CASCADE", // Added CASCADE deletion
});
SubCharacteristic.belongsTo(Characteristic, {
  foreignKey: "characteristicId",
  as: "characteristic",
  onDelete: "CASCADE", // Added CASCADE deletion
});

// Media Associations
Product.hasMany(Media, {
  foreignKey: "productId",
  as: "media",
  onDelete: "CASCADE", // Added CASCADE deletion
});
Media.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
  onDelete: "CASCADE", // Added CASCADE deletion
});

// Cart Associations
User.hasMany(Cart, {
  foreignKey: "userId",
  as: "cart",
  onDelete: "CASCADE", // Added CASCADE deletion
});
Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE", // Added CASCADE deletion
});

Product.belongsToMany(Cart, {
  through: Order,
  foreignKey: "productId",
  as: "orders_products",
  onDelete: "CASCADE",
});

Cart.belongsToMany(Product, {
  through: Order,
  foreignKey: "cartId",
  as: "products_orders",
  onDelete: "CASCADE",
});

// Add direct Order associations for easier querying
Order.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Order.belongsTo(Cart, {
  foreignKey: "cartId",
  as: "cart",
});

// Slider and Product One-to-One Association

Product.hasOne(Slider, {
  foreignKey: "productId",
  as: "slider",
  onDelete: "SET NULL",
  unique: false,
});
Slider.belongsTo(Product, {
  foreignKey: {
    name: "productId",
  },
  as: "product",
  onDelete: "SET NULL", // If product is deleted, set slider's productId to null
});

// Bookmarks Table Creation
User.belongsToMany(Product, {
  through: "bookmarks",
  foreignKey: "userId",
  as: "product",
  onDelete: "CASCADE", // Added CASCADE deletion
});
Product.belongsToMany(User, {
  through: "bookmarks",
  foreignKey: "productId",
  as: "user",
  onDelete: "CASCADE", // Added CASCADE deletion
});

// Initialize hooks after all associations are set up
initializeHooks({ Cart, Order, Product });

export default {
  Cart,
  Category,
  Characteristic,
  Media,
  Partner,
  Product,
  Slider,
  SubCategory,
  SubCharacteristic,
  SubSubCategory,
  User,
  ProductSubCharacteristic,
  Order,
};
