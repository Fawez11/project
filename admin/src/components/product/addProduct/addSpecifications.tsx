import React from "react";

function addSpecifications() {
  return (
    <div className="product-form-box sherah-border mg-top-30">
      <h4 className="form-title m-0">Specification</h4>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Stock</label>
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
            <label className="sherah-wc__form-label">Weight</label>
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
            <label className="sherah-wc__form-label">Size</label>
            <div className="checkbox-group">
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option1"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option1"
                >
                  MM
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option2"
                  checked
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option2"
                >
                  XL
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option3"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option3"
                >
                  M
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option4"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option4"
                >
                  MM
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option5"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option5"
                >
                  X
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option6"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option6"
                >
                  SM
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option7"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option7"
                >
                  2X
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option8"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option8"
                >
                  3X
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Colors</label>
            <div className="checkbox-group">
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option9"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option9"
                >
                  White
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option10"
                  checked
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option10"
                >
                  Black
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option11"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option11"
                >
                  Harlequin
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option12"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option12"
                >
                  Red
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option13"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option13"
                >
                  Yellow
                </label>
              </div>
              <div className="checkbox-group__single">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="options"
                  id="option14"
                  autoComplete="off"
                />
                <label
                  className="checkbox-group__single--label"
                  htmlFor="option14"
                >
                  Blue
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default addSpecifications;
