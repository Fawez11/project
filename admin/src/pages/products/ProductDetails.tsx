import ProductGallery from "../../components/product/productDetails/ProductGallery";
import ProductInfo from "../../components/product/productDetails/ProductInfo";
import ProductTabs from "../../components/product/productDetails/ProductTabs";

function ProductDetails() {
  return (
    <div className="sherah-dsinner">
      {/* Breadcrumb */}
      <div className="row mg-top-30">
        <div className="col-12 sherah-flex-between">
          <div className="sherah-breadcrumb">
            <h2 className="sherah-breadcrumb__title">Product Details</h2>
            <ul className="sherah-breadcrumb__list">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">
                <a href="products.html">Products Details</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="product-detail-body sherah-default-bg sherah-border mg-top-30">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <ProductGallery />
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <ProductInfo />
          </div>
        </div>
      </div>

      {/* Product Tabs Section */}
      <ProductTabs />
    </div>
  );
}

export default ProductDetails;
