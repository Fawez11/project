// src/router.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/subPages.tsx/Dashboard";
import Login from "./pages/Login";
import CreateAcount from "./pages/CreateAccount";
import DashboardContent from "./pages/subPages.tsx/DashboardContent";
import PartnerGrid from "./pages/partners/PartnerGrid";
import PartnerList from "./pages/partners/PartnerList";
import PartnerProfile from "./pages/partners/PartnerProfile";
import MainProfile from "./pages/adminProfile/MainProfile";
import ChangePassword from "./pages/adminProfile/profileSubPages/ChangePassword";
import ConnectWithSocial from "./pages/adminProfile/profileSubPages/ConnectWithSocial";
import LoginActivity from "./pages/adminProfile/profileSubPages/LoginActivity";
import NotificationSettings from "./pages/adminProfile/profileSubPages/NotificationSettings";
import PaymentMethod from "./pages/adminProfile/profileSubPages/PaymentMethod";
import PersonalInfo from "./pages/adminProfile/profileSubPages/PersonalInfo";
import Product from "./pages/oldProducts/Product.tsx";
import AddProduct from "./pages/oldProducts/AddProduct.tsx";
import Categories from "./pages/categories/Categories.tsx";
import SubCategories from "./pages/subCategories/SubCategories.tsx";
import SubSubCategories from "./pages/subSubCategories/SubSubCategories.tsx";
import ResetPassword from "./pages/ResetPassword";
import useAuthGuard from "./customHooks/useAuthGuard.tsx"; // Import the auth guard
import ProductDetails from "./pages/products/ProductDetails.tsx";
import CustomerList from "./pages/customers/customerList.tsx";
import CustomerDetail from "./pages/customers/CustomerDetail.tsx";
// import OrderList from "./pages/orders/";
import OrderDetails from "./pages/orders/OrderDetails.tsx";
import SliderManagement from "./pages/SliderManagement/SliderManagement.tsx";
// import ProductDetails from "./pages/oldProducts/ProductDetails.tsx";
import ProductsThroughCategories from "./pages/productsThroughCategories/Products.tsx";
import ProductsThroughPartners from "./pages/productsThroughPartners/Products.tsx";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  useAuthGuard(); // Call the auth guard
  return element; // Render the protected element
};

const AppRouter = () => {
  return (
    <div id="sherah-dark-light">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
            <Route
              index
              element={<ProtectedRoute element={<DashboardContent />} />}
            />
            <Route
              path="grid"
              element={<ProtectedRoute element={<PartnerGrid />} />}
            />
            <Route
              path="/admin"
              element={<ProtectedRoute element={<MainProfile />} />}
            >
              <Route
                index
                element={<ProtectedRoute element={<PersonalInfo />} />}
              />
              <Route
                path="changePassword"
                element={<ProtectedRoute element={<ChangePassword />} />}
              />
              <Route
                path="connect"
                element={<ProtectedRoute element={<ConnectWithSocial />} />}
              />
              <Route
                path="login"
                element={<ProtectedRoute element={<LoginActivity />} />}
              />
              <Route
                path="notificationSetting"
                element={<ProtectedRoute element={<NotificationSettings />} />}
              />
              <Route
                path="paymentMethod"
                element={<ProtectedRoute element={<PaymentMethod />} />}
              />
            </Route>
            <Route
              path="partners"
              element={<ProtectedRoute element={<PartnerList />} />}
            />
            <Route
              path="partners/:partnerId"
              element={<ProtectedRoute element={<ProductsThroughPartners />} />}
            />
            <Route
              path="profile/:id"
              element={<ProtectedRoute element={<PartnerProfile />} />}
            />
            <Route
              path="/product"
              element={<ProtectedRoute element={<Product />} />}
            />
            <Route
              path="/addProduct"
              element={<ProtectedRoute element={<AddProduct />} />}
            />
            <Route
              path="/productDetails"
              element={<ProtectedRoute element={<ProductDetails />} />}
            />
            <Route
              path="/customerList"
              element={<ProtectedRoute element={<CustomerList />} />}
            />
            <Route
              path="/customerDetails"
              element={<ProtectedRoute element={<CustomerDetail />} />}
            />
            {/* <Route
              path="/orderList"
              element={<ProtectedRoute element={<OrderList />} />}
            /> */}
            <Route
              path="/orderDetails"
              element={<ProtectedRoute element={<OrderDetails />} />}
            />
            <Route
              path="/categories"
              element={<ProtectedRoute element={<Categories />} />}
            />
            <Route
              path="categories/:categoryId"
              element={<ProtectedRoute element={<SubCategories />} />}
            />
            <Route
              path="categories/:categoryId/:subCategoryId"
              element={<ProtectedRoute element={<SubSubCategories />} />}
            />
            <Route
              path="categories/:categoryId/:subCategoryId/:subSubCategoryId"
              element={
                <ProtectedRoute element={<ProductsThroughCategories />} />
              }
            />
            <Route
              path="products/:productId"
              element={<ProtectedRoute element={<ProductDetails />} />}
            />
          </Route>
          <Route path="/create" element={<CreateAcount />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/sliderManagement"
            element={<ProtectedRoute element={<SliderManagement />} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
