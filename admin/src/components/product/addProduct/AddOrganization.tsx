import React from "react";

function AddOrganization() {
  return (
    <div className="product-form-box sherah-border mg-top-30">
      <h4 className="form-title m-0">Organization</h4>
      <div className="form-group">
        <label className="sherah-wc__form-label">Add Category</label>
        <div className="form-group__input">
          <input
            className="sherah-wc__form-input"
            placeholder="Type here"
            type="text"
            name="p_title"
          />
          <button
            className="sherah-btn__add sherah-btn sherah-btn__secondary"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
      <div className="form-group">
        <label className="sherah-wc__form-label">Add Brand</label>
        <div className="form-group__input">
          <input
            className="sherah-wc__form-input"
            placeholder="Type here"
            type="text"
            name="p_title"
          />
          <button
            className="sherah-btn__add sherah-btn sherah-btn__secondary"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
      <div className="form-group">
        <label className="sherah-wc__form-label">Add Color</label>
        <div className="form-group__input">
          <input
            className="sherah-wc__form-input"
            placeholder="Type here"
            type="text"
            name="p_title"
          />
          <button
            className="sherah-btn__add sherah-btn sherah-btn__secondary"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
      <div className="form-group">
        <label className="sherah-wc__form-label">Add Size</label>
        <div className="form-group__input">
          <input
            className="sherah-wc__form-input"
            placeholder="Type here"
            type="text"
            name="p_title"
          />
          <button
            className="sherah-btn__add sherah-btn sherah-btn__secondary"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOrganization;
