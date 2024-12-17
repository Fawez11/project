function ProductForm() {
  return (
    <div className="product-form-box sherah-border mg-top-30">
      <h4 className="form-title m-0">Basic Information</h4>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Product Title</label>
            <div className="form-group__input">
              <input
                className="sherah-wc__form-input"
                placeholder="Type here"
                type="text"
                name="p_title"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Regular Price</label>
            <div className="form-group__input">
              <input
                className="sherah-wc__form-input"
                placeholder="Type here"
                type="text"
                name="p_title"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Discount Price</label>
            <div className="form-group__input">
              <input
                className="sherah-wc__form-input"
                placeholder="Type here"
                type="text"
                name="p_title"
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">About Description</label>
            <div className="form-group__input">
              <textarea
                className="sherah-wc__form-input"
                placeholder="Type here"
                name="p_title"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Category*</label>
            <select
              className="form-group__input"
              aria-label="Default select example"
            >
              <option selected>Men</option>
              <option value="1">Women</option>
              <option value="2">Clock</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Brand*</label>
            <select
              className="form-group__input"
              aria-label="Default select example"
            >
              <option selected>NogorPolli</option>
              <option value="1">BangBang</option>
              <option value="2">Bagdoom</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Shipping Free</label>
            <div className="form-group__input">
              <input
                className="sherah-wc__form-input"
                placeholder="Type here"
                type="text"
                name="p_title"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Tax Rate</label>
            <div className="form-group__input">
              <input
                className="sherah-wc__form-input"
                placeholder="Type here"
                type="text"
                name="p_title"
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Tag</label>
            <div className="form-group__input">
              <textarea
                className="sherah-wc__form-input"
                placeholder="Tag type here"
                name="p_title"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
