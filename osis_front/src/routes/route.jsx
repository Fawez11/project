import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import websiteRouter from "./website/route";
import adminRouter from "./admin/route";

const App = lazy(() => import("../App"));
const LayoutWebsite = lazy(() => import("../pages/website/layout/Layout"));
const LayoutAdmin = lazy(() => import("../pages/admin/layout/Layout"));
const ProductPage = lazy(() =>
  import("../pages/website/website_pages/products/Products")
);

const ForgetPassword = lazy(() =>
  import("../pages/website/website_pages/agencyAuth/ForgetPassword")
);
const EmailConfirmed = lazy(() =>
  import("../pages/website/website_pages/agencyAuth/EmailConfirmed")
);
const EmailConfirmation = lazy(() =>
  import("../pages/website/website_pages/agencyAuth/EmailConfirmation")
);
const ResetPassword = lazy(() =>
  import("../pages/website/website_pages/agencyAuth/ResetPassword")
);

const VerifyEmail = lazy(() =>
  import("../pages/website/website_pages/agencyAuth/VerifyEmail")
);

const ProductDetails = lazy(() =>
  import("../pages/website/website_pages/product_details/ProductDetails")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div></div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div></div>}>
            <LayoutWebsite />
          </Suspense>
        ),
        children: [...websiteRouter],
      },
      {
        path: "forget-password",
        element: (
          <Suspense fallback={<div>loading</div>}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: "email-confirmed",
        element: (
          <Suspense fallback={<div>loading</div>}>
            <EmailConfirmed />
          </Suspense>
        ),
      },
      {
        path: "email-confirmation",
        element: (
          <Suspense fallback={<div>loading</div>}>
            <EmailConfirmation />
          </Suspense>
        ),
      },
      //
      {
        path: "resetPassword",
        element: (
          <Suspense fallback={<div>loading</div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "verify-email",
        element: (
          <Suspense fallback={<div>loading</div>}>
            <VerifyEmail />
          </Suspense>
        ),
      },
      {
        path: "admin",
        element: (
          <Suspense fallback={<div></div>}>
            <LayoutAdmin />
          </Suspense>
        ),
        children: [...adminRouter],
      },
      {
        path: "products/subcategory/:subCategoryId",
        element: (
          <Suspense fallback={<div></div>}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: "products/subsubcategory/:subSubCategoryId",
        element: (
          <Suspense fallback={<div></div>}>
            <ProductPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
