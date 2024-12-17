import { lazy, Suspense } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router-dom";
const Home = lazy(() => import("../../pages/website/website_pages/home/Home"));
const Products = lazy(() =>
  import("../../pages/website/website_pages/products/Products")
);
const AgencyAuth = lazy(() =>
  import("../../pages/website/website_pages/agencyAuth/AgencyAuth")
);
const ProductDetails = lazy(() =>
  import("../../pages/website/website_pages/product_details/ProductDetails")
);
const ProfilePage = lazy(() =>
  import("../../pages/website/website_pages/profile/ProfilePage")
);
const EditProfile = lazy(() =>
  import("../../pages/website/website_pages/profile/EditProfile")
);
const ChangePassword = lazy(() =>
  import("../../pages/website/website_pages/profile/ChangePassword")
);
const NotificationSettings = lazy(() =>
  import("../../pages/website/website_pages/profile/NotificationSettings")
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/section_entreprise" replace />;
  }
  return children;
};

const adminRoutes = [
  {
    path: "",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Products />
      </Suspense>
    ),
  },
  {
    path: "section_entreprise",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <AgencyAuth />
      </Suspense>
    ),
  },
  {
    path: "product_detail",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <ProductDetails />
      </Suspense>
    ),
  },
  {
    path: "products/subsubcategory/:subSubCategoryId",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Products />
      </Suspense>
    ),
  },
  {
    path: "profile",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "edit-profile",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "products/subcategory/:subCategoryId",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Products />
      </Suspense>
    ),
  },
  {
    path: "product/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails />
      </Suspense>
    ),
  },
  {
    path: "change-password",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "notifications",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProtectedRoute>
          <NotificationSettings />
        </ProtectedRoute>
      </Suspense>
    ),
  },
];

export default adminRoutes;
