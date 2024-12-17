import AddOrganization from "../../components/product/addProduct/AddOrganization";
import AddSpecifications from "../../components/product/addProduct/addSpecifications";
import ProductForm from "../../components/product/addProduct/ProductForm";
import UploadImages from "../../components/product/addProduct/UploadImages";
import { useEffect } from "react";
function AddProduct() {
  useEffect(() => {
    document.title = "Add Product";
  }, []);
  return (
    <div>
      <div className="sherah-dsinner">
        <div className="row">
          <div className="col-12">
            <div className="sherah-breadcrumb mg-top-30">
              <h2 className="sherah-breadcrumb__title">Upload Product</h2>
              <ul className="sherah-breadcrumb__list">
                <li>
                  <a href="#">Home</a>
                </li>
                <li className="active">
                  <a href="profile-info.html">Upload Product</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sherah-page-inner sherah-border sherah-basic-page sherah-default-bg mg-top-25 p-0">
          <form className="sherah-wc__form-main" action="#">
            <div className="row">
              <div className="col-lg-6 col-12">
                <ProductForm />
              </div>
              <div className="col-lg-6 col-12">
                {/* <AddOrganization /> */}
                <AddSpecifications />
              </div>
            </div>
            <UploadImages />
            <div className=" mg-top-40 sherah-dflex sherah-dflex-gap-30 justify-content-end">
              <button type="submit" className="sherah-btn sherah-btn__primary">
                Publish Product
              </button>
              <button className="sherah-btn sherah-btn__third">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
