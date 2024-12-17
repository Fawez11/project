const ProductGallery = () => {
  const images = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "contact", label: "Contact" },
    { id: "four", label: "Four" },
  ];

  return (
    <div className="product-gallery">
      <div className="product-details-image">
        <ul
          className="nav-pills nav flex-nowrap product-thumbs"
          id="pills-tab"
          role="tablist"
        >
          {images.map((image, index) => (
            <li key={image.id} className="single-thumbs" role="presentation">
              <a
                className={index === 0 ? "active" : ""}
                id={`pills-${image.id}-tab`}
                data-bs-toggle="pill"
                href={`#pills-${image.id}`}
                role="tab"
                aria-controls={`pills-${image.id}`}
                aria-selected={index === 0}
              >
                <img src="img/product-detail.png" alt="thumbs" />
              </a>
            </li>
          ))}
        </ul>

        <div className="main-preview-image">
          <div className="tab-content product-image" id="pills-tabContent">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                id={`pills-${image.id}`}
                role="tabpanel"
                aria-labelledby={`pills-${image.id}-tab`}
              >
                <div className="single-product-image">
                  <img src="img/product-detail.png" alt="product" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
