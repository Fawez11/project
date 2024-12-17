import React from "react";

const SpecificationsTab = () => {
  return (
    <>
      <div className="sherah-product-tabs__text">
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words.
        </p>
      </div>
      <div className="sherah-table p-0">
        <table className="product-overview-table mg-top-30">
          <tbody>
            <tr>
              <td>
                <span className="product-overview-table_title">
                  Package Dimensions
                </span>
              </td>
              <td>
                <span className="product-overview-table_text">
                  44 x 32 x 4 cm, 560 Grams
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="product-overview-table_title">
                  Manufacturer
                </span>
              </td>
              <td>
                <span className="product-overview-table_text">
                  Badgley Mischka
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="product-overview-table_title">
                  Product Part Number
                </span>
              </td>
              <td>
                <span className="product-overview-table_text">
                  JKGHNBKJG-MN563205
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="product-overview-table_title">
                  Best Sellers Rank
                </span>
              </td>
              <td>
                <span className="product-overview-table_text">
                  #561 in Clothing and Accessories
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="product-overview-table_title">
                  Customer Reviews
                </span>
              </td>
              <td>
                <div className="sherah-product-card__meta sherah-dflex sherah-flex-gap-30">
                  <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
                    {[1, 2, 3, 4].map((star) => (
                      <span key={star} className="sherah-color4">
                        <i className="fa fa-star"></i>
                      </span>
                    ))}
                    <span className="sherah-color4">
                      <i className="fa-regular fa-star"></i>
                    </span>
                    2,580 Ratings
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SpecificationsTab;
