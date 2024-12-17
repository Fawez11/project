function ProductDetails() {
  const productId = location.pathname.split("/")[2];
  console.log("productId", productId);

  return (
    <div className="col-12">
      this is the product details page of the product with id: {productId}
      <br />
      {"(file to work on: admin/src/pages/oldProducts/ProductDetails.tsx)"}
    </div>
  );
}

export default ProductDetails;
