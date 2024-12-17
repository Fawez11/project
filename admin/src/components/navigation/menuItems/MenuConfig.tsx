// admin/src/components/navigation/menuItems/menuConfig.ts

import DashboardSvg from "../../svgComponenents/DashboardSvg";
import VendorSvg from "../../svgComponenents/VendorSvg";
import CustomerSvg from "../../svgComponenents/CustomerSvg";
import ProductSvg from "../../svgComponenents/ProductSvg";
import CategoriesSvg from "../../svgComponenents/categoriesSvg";
import OrderSvg from "../../svgComponenents/OrderSvg";
// import InvoicesSvg from "../../svgComponenents/InvoicesSvg";
// import HistorySvg from "../../svgComponenents/HistorySvg";
import SettingsSvg from "../../svgComponenents/SettingsSvg";
// import MessageSvg from "../../svgComponenents/MessageSvg";
// import PageSvg from "../../svgComponenents/PageSvg";
// import LanguageSvg from "../../svgComponenents/LanguageSvg";

interface MenuItem {
  title: string;
  iconSvg: JSX.Element;
  menuItems: { href: string; label: string }[];
  dropdown: boolean;
  href?: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    iconSvg: <DashboardSvg />,
    menuItems: [],
    dropdown: false,
    href: "/",
  },
  {
    title: "Categories",
    iconSvg: <CategoriesSvg />,
    menuItems: [],
    dropdown: false,
    href: "categories",
  },

  {
    title: "Partners",
    iconSvg: <VendorSvg />,
    dropdown: true,

    menuItems: [
      { href: "grid", label: "Partners Grid" },
      { href: "partners", label: "Partners List" },
      //   { href: "vendor-profile.html", label: "Vendor Profile" },
    ],
  },
  {
    title: "Customers",
    iconSvg: <CustomerSvg />,
    dropdown: true,

    menuItems: [
      { href: "customerList", label: "Customer List" },
      { href: "customerDetails", label: "Customers" },
    ],
  },

  {
    title: "Products",
    iconSvg: <ProductSvg />,
    dropdown: true,
    href: "/product",

    menuItems: [
      { href: "productDetails", label: "Product Details" },
      { href: "addProduct", label: "Add Product" },
      { href: "product", label: "Products" },
    ],
  },
  {
    title: "Orders",
    iconSvg: <OrderSvg />,
    dropdown: true,
    menuItems: [
      { href: "orderList", label: "Order List" },
      { href: "orderDetails", label: "Order Details" },
    ],
  },
  // Add other menu items similarly
];

export default menuItems;
