// admin/src/components/dashboard/cards/ProductCards.tsx

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pic from "../../../assets/img/product-slider-1.png";
import { SamplePrevArrow, SampleNextArrow } from "../../utils/CustomArrows";

function ProductCards() {
  const settings = {
    autoplay: false,
    speed: 800,
    autoplaySpeed: 3500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    dots: true,
    center: true,
    arrows: true,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 2,
          // gap: 1,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="sherah-products sherah-default-bg sherah-border mg-left-30 mg-top-30">
          <h4 className="sherah-heading__title">Top Products</h4>
          <div className="sherah-product-slider">
            <Slider {...settings}>
              <div className="sherah-product-card sherah-default-bg sherah-border mg-top-30">
                {/* <!-- Card Image --> */}
                <div className="sherah-product-card__img">
                  <img src={pic} />
                </div>
                {/* <!-- Card Content --> */}
                <div className="sherah-product-card__content sherah-dflex-column sherah-flex-gap-5">
                  <h4 className="sherah-product-card__title">
                    <a href="#" className="sherah-pcolor">
                      Stylish <b>leather bag</b>
                    </a>
                  </h4>
                  <h5 className="sherah-product-card__price">
                    <del>$150</del>$130
                  </h5>
                  <div className="sherah-product-card__meta sherah-dflex sherah-flex-gap-30">
                    <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
                      <span className="sherah-color4">
                        <i className="fa fa-star"></i>
                      </span>
                      51
                    </div>
                    <div className="sherah-product-card__sales sherah-pcolor sherah-dflex">
                      <svg
                        className="sherah-offset__fill"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 5.961 10.425"
                      >
                        <path
                          id="Path_467"
                          data-name="Path 467"
                          d="M-292.343,706.88c-.352-.119-.71-.222-1.055-.36a2.132,2.132,0,0,1-1.245-1.047,2.08,2.08,0,0,1,1.107-2.766,6.637,6.637,0,0,1,.989-.291,2.124,2.124,0,0,1,.218-.036c0-.238,0-.467,0-.7a.405.405,0,0,1,.42-.445.4.4,0,0,1,.4.44c0,.231,0,.461.006.692a.025.025,0,0,0,.005.013,6.038,6.038,0,0,1,.922.229,6.612,6.612,0,0,1,1.029.561.506.506,0,0,1,.141.745.539.539,0,0,1-.787.116,3.057,3.057,0,0,0-1.18-.524l-.11-.019a1.2,1.2,0,0,0-.019.146c0,.665,0,1.33,0,2,0,.137.054.178.175.219a9.93,9.93,0,0,1,1.14.425,1.969,1.969,0,0,1,1.2,2.07,2.109,2.109,0,0,1-1.415,1.935,9.979,9.979,0,0,1-1.1.292c0,.2,0,.418,0,.641a.4.4,0,0,1-.413.45.411.411,0,0,1-.412-.455c0-.2,0-.407,0-.611,0-.012-.009-.025,0-.012-.4-.092-.781-.161-1.154-.273a3.455,3.455,0,0,1-1.228-.7.543.543,0,0,1-.091-.791.508.508,0,0,1,.773-.057,3.382,3.382,0,0,0,1.6.714c.026,0,.053,0,.093.007Zm.859.271v2.342a1.27,1.27,0,0,0,1.3-1.2A1.312,1.312,0,0,0-291.484,707.152Zm-.856-1.53v-2.179a1.577,1.577,0,0,0-.912.345.878.878,0,0,0,0,1.4A6.98,6.98,0,0,0-292.34,705.622Z"
                          transform="translate(294.936 -701.239)"
                        />
                      </svg>
                      Sales (60)
                    </div>
                  </div>
                </div>
              </div>
              <div className="sherah-product-card sherah-default-bg sherah-border mg-top-30">
                {/* <!-- Card Image --> */}
                <div className="sherah-product-card__img">
                  <img src={pic} />
                </div>
                {/* <!-- Card Content --> */}
                <div className="sherah-product-card__content sherah-dflex-column sherah-flex-gap-5">
                  <h4 className="sherah-product-card__title">
                    <a href="#" className="sherah-pcolor">
                      Stylish <b>leather bag</b>
                    </a>
                  </h4>
                  <h5 className="sherah-product-card__price">
                    <del>$150</del>$130
                  </h5>
                  <div className="sherah-product-card__meta sherah-dflex sherah-flex-gap-30">
                    <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
                      <span className="sherah-color4">
                        <i className="fa fa-star"></i>
                      </span>
                      51
                    </div>
                    <div className="sherah-product-card__sales sherah-pcolor sherah-dflex">
                      <svg
                        className="sherah-offset__fill"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 5.961 10.425"
                      >
                        <path
                          id="Path_467"
                          data-name="Path 467"
                          d="M-292.343,706.88c-.352-.119-.71-.222-1.055-.36a2.132,2.132,0,0,1-1.245-1.047,2.08,2.08,0,0,1,1.107-2.766,6.637,6.637,0,0,1,.989-.291,2.124,2.124,0,0,1,.218-.036c0-.238,0-.467,0-.7a.405.405,0,0,1,.42-.445.4.4,0,0,1,.4.44c0,.231,0,.461.006.692a.025.025,0,0,0,.005.013,6.038,6.038,0,0,1,.922.229,6.612,6.612,0,0,1,1.029.561.506.506,0,0,1,.141.745.539.539,0,0,1-.787.116,3.057,3.057,0,0,0-1.18-.524l-.11-.019a1.2,1.2,0,0,0-.019.146c0,.665,0,1.33,0,2,0,.137.054.178.175.219a9.93,9.93,0,0,1,1.14.425,1.969,1.969,0,0,1,1.2,2.07,2.109,2.109,0,0,1-1.415,1.935,9.979,9.979,0,0,1-1.1.292c0,.2,0,.418,0,.641a.4.4,0,0,1-.413.45.411.411,0,0,1-.412-.455c0-.2,0-.407,0-.611,0-.012-.009-.025,0-.012-.4-.092-.781-.161-1.154-.273a3.455,3.455,0,0,1-1.228-.7.543.543,0,0,1-.091-.791.508.508,0,0,1,.773-.057,3.382,3.382,0,0,0,1.6.714c.026,0,.053,0,.093.007Zm.859.271v2.342a1.27,1.27,0,0,0,1.3-1.2A1.312,1.312,0,0,0-291.484,707.152Zm-.856-1.53v-2.179a1.577,1.577,0,0,0-.912.345.878.878,0,0,0,0,1.4A6.98,6.98,0,0,0-292.34,705.622Z"
                          transform="translate(294.936 -701.239)"
                        />
                      </svg>
                      Sales (60)
                    </div>
                  </div>
                </div>
              </div>
              <div className="sherah-product-card sherah-default-bg sherah-border mg-top-30">
                {/* <!-- Card Image --> */}
                <div className="sherah-product-card__img">
                  <img src={pic} />
                </div>
                {/* <!-- Card Content --> */}
                <div className="sherah-product-card__content sherah-dflex-column sherah-flex-gap-5">
                  <h4 className="sherah-product-card__title">
                    <a href="#" className="sherah-pcolor">
                      Stylish <b>leather bag</b>
                    </a>
                  </h4>
                  <h5 className="sherah-product-card__price">
                    <del>$150</del>$130
                  </h5>
                  <div className="sherah-product-card__meta sherah-dflex sherah-flex-gap-30">
                    <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
                      <span className="sherah-color4">
                        <i className="fa fa-star"></i>
                      </span>
                      51
                    </div>
                    <div className="sherah-product-card__sales sherah-pcolor sherah-dflex">
                      <svg
                        className="sherah-offset__fill"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 5.961 10.425"
                      >
                        <path
                          id="Path_467"
                          data-name="Path 467"
                          d="M-292.343,706.88c-.352-.119-.71-.222-1.055-.36a2.132,2.132,0,0,1-1.245-1.047,2.08,2.08,0,0,1,1.107-2.766,6.637,6.637,0,0,1,.989-.291,2.124,2.124,0,0,1,.218-.036c0-.238,0-.467,0-.7a.405.405,0,0,1,.42-.445.4.4,0,0,1,.4.44c0,.231,0,.461.006.692a.025.025,0,0,0,.005.013,6.038,6.038,0,0,1,.922.229,6.612,6.612,0,0,1,1.029.561.506.506,0,0,1,.141.745.539.539,0,0,1-.787.116,3.057,3.057,0,0,0-1.18-.524l-.11-.019a1.2,1.2,0,0,0-.019.146c0,.665,0,1.33,0,2,0,.137.054.178.175.219a9.93,9.93,0,0,1,1.14.425,1.969,1.969,0,0,1,1.2,2.07,2.109,2.109,0,0,1-1.415,1.935,9.979,9.979,0,0,1-1.1.292c0,.2,0,.418,0,.641a.4.4,0,0,1-.413.45.411.411,0,0,1-.412-.455c0-.2,0-.407,0-.611,0-.012-.009-.025,0-.012-.4-.092-.781-.161-1.154-.273a3.455,3.455,0,0,1-1.228-.7.543.543,0,0,1-.091-.791.508.508,0,0,1,.773-.057,3.382,3.382,0,0,0,1.6.714c.026,0,.053,0,.093.007Zm.859.271v2.342a1.27,1.27,0,0,0,1.3-1.2A1.312,1.312,0,0,0-291.484,707.152Zm-.856-1.53v-2.179a1.577,1.577,0,0,0-.912.345.878.878,0,0,0,0,1.4A6.98,6.98,0,0,0-292.34,705.622Z"
                          transform="translate(294.936 -701.239)"
                        />
                      </svg>
                      Sales (60)
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="sherah-product-card sherah-default-bg sherah-border mg-top-30">
                {/* <!-- Card Image --> */}
                <div className="sherah-product-card__img">
                  <img src={pic} />
                </div>
                {/* <!-- Card Content --> */}
                <div className="sherah-product-card__content sherah-dflex-column sherah-flex-gap-5">
                  <h4 className="sherah-product-card__title">
                    <a href="#" className="sherah-pcolor">
                      Stylish <b>leather bag</b>
                    </a>
                  </h4>
                  <h5 className="sherah-product-card__price">
                    <del>$150</del>$130
                  </h5>
                  <div className="sherah-product-card__meta sherah-dflex sherah-flex-gap-30">
                    <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
                      <span className="sherah-color4">
                        <i className="fa fa-star"></i>
                      </span>
                      51
                    </div>
                    <div className="sherah-product-card__sales sherah-pcolor sherah-dflex">
                      <svg
                        className="sherah-offset__fill"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 5.961 10.425"
                      >
                        <path
                          id="Path_467"
                          data-name="Path 467"
                          d="M-292.343,706.88c-.352-.119-.71-.222-1.055-.36a2.132,2.132,0,0,1-1.245-1.047,2.08,2.08,0,0,1,1.107-2.766,6.637,6.637,0,0,1,.989-.291,2.124,2.124,0,0,1,.218-.036c0-.238,0-.467,0-.7a.405.405,0,0,1,.42-.445.4.4,0,0,1,.4.44c0,.231,0,.461.006.692a.025.025,0,0,0,.005.013,6.038,6.038,0,0,1,.922.229,6.612,6.612,0,0,1,1.029.561.506.506,0,0,1,.141.745.539.539,0,0,1-.787.116,3.057,3.057,0,0,0-1.18-.524l-.11-.019a1.2,1.2,0,0,0-.019.146c0,.665,0,1.33,0,2,0,.137.054.178.175.219a9.93,9.93,0,0,1,1.14.425,1.969,1.969,0,0,1,1.2,2.07,2.109,2.109,0,0,1-1.415,1.935,9.979,9.979,0,0,1-1.1.292c0,.2,0,.418,0,.641a.4.4,0,0,1-.413.45.411.411,0,0,1-.412-.455c0-.2,0-.407,0-.611,0-.012-.009-.025,0-.012-.4-.092-.781-.161-1.154-.273a3.455,3.455,0,0,1-1.228-.7.543.543,0,0,1-.091-.791.508.508,0,0,1,.773-.057,3.382,3.382,0,0,0,1.6.714c.026,0,.053,0,.093.007Zm.859.271v2.342a1.27,1.27,0,0,0,1.3-1.2A1.312,1.312,0,0,0-291.484,707.152Zm-.856-1.53v-2.179a1.577,1.577,0,0,0-.912.345.878.878,0,0,0,0,1.4A6.98,6.98,0,0,0-292.34,705.622Z"
                          transform="translate(294.936 -701.239)"
                        />
                      </svg>
                      Sales (60)
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="sherah-product-card sherah-default-bg sherah-border mg-top-30">
                {/* <!-- Card Image --> */}
                <div className="sherah-product-card__img">
                  <img src={pic} />
                </div>
                {/* <!-- Card Content --> */}
                <div className="sherah-product-card__content sherah-dflex-column sherah-flex-gap-5">
                  <h4 className="sherah-product-card__title">
                    <a href="#" className="sherah-pcolor">
                      Stylish <b>leather bag</b>
                    </a>
                  </h4>
                  <h5 className="sherah-product-card__price">
                    <del>$150</del>$130
                  </h5>
                  <div className="sherah-product-card__meta sherah-dflex sherah-flex-gap-30">
                    <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
                      <span className="sherah-color4">
                        <i className="fa fa-star"></i>
                      </span>
                      51
                    </div>
                    <div className="sherah-product-card__sales sherah-pcolor sherah-dflex">
                      <svg
                        className="sherah-offset__fill"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 5.961 10.425"
                      >
                        <path
                          id="Path_467"
                          data-name="Path 467"
                          d="M-292.343,706.88c-.352-.119-.71-.222-1.055-.36a2.132,2.132,0,0,1-1.245-1.047,2.08,2.08,0,0,1,1.107-2.766,6.637,6.637,0,0,1,.989-.291,2.124,2.124,0,0,1,.218-.036c0-.238,0-.467,0-.7a.405.405,0,0,1,.42-.445.4.4,0,0,1,.4.44c0,.231,0,.461.006.692a.025.025,0,0,0,.005.013,6.038,6.038,0,0,1,.922.229,6.612,6.612,0,0,1,1.029.561.506.506,0,0,1,.141.745.539.539,0,0,1-.787.116,3.057,3.057,0,0,0-1.18-.524l-.11-.019a1.2,1.2,0,0,0-.019.146c0,.665,0,1.33,0,2,0,.137.054.178.175.219a9.93,9.93,0,0,1,1.14.425,1.969,1.969,0,0,1,1.2,2.07,2.109,2.109,0,0,1-1.415,1.935,9.979,9.979,0,0,1-1.1.292c0,.2,0,.418,0,.641a.4.4,0,0,1-.413.45.411.411,0,0,1-.412-.455c0-.2,0-.407,0-.611,0-.012-.009-.025,0-.012-.4-.092-.781-.161-1.154-.273a3.455,3.455,0,0,1-1.228-.7.543.543,0,0,1-.091-.791.508.508,0,0,1,.773-.057,3.382,3.382,0,0,0,1.6.714c.026,0,.053,0,.093.007Zm.859.271v2.342a1.27,1.27,0,0,0,1.3-1.2A1.312,1.312,0,0,0-291.484,707.152Zm-.856-1.53v-2.179a1.577,1.577,0,0,0-.912.345.878.878,0,0,0,0,1.4A6.98,6.98,0,0,0-292.34,705.622Z"
                          transform="translate(294.936 -701.239)"
                        />
                      </svg>
                      Sales (60)
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="sherah-product-card sherah-default-bg sherah-border mg-top-30">
                {/* <!-- Card Image --> */}
                <div className="sherah-product-card__img">
                  <img src={pic} />
                </div>
                {/* <!-- Card Content --> */}
                <div className="sherah-product-card__content sherah-dflex-column sherah-flex-gap-5">
                  <h4 className="sherah-product-card__title">
                    <a href="#" className="sherah-pcolor">
                      Stylish <b>leather bag</b>
                    </a>
                  </h4>
                  <h5 className="sherah-product-card__price">
                    <del>$150</del>$130
                  </h5>
                  <div className="sherah-product-card__meta sherah-dflex sherah-flex-gap-30">
                    <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
                      <span className="sherah-color4">
                        <i className="fa fa-star"></i>
                      </span>
                      51
                    </div>
                    <div className="sherah-product-card__sales sherah-pcolor sherah-dflex">
                      <svg
                        className="sherah-offset__fill"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 5.961 10.425"
                      >
                        <path
                          id="Path_467"
                          data-name="Path 467"
                          d="M-292.343,706.88c-.352-.119-.71-.222-1.055-.36a2.132,2.132,0,0,1-1.245-1.047,2.08,2.08,0,0,1,1.107-2.766,6.637,6.637,0,0,1,.989-.291,2.124,2.124,0,0,1,.218-.036c0-.238,0-.467,0-.7a.405.405,0,0,1,.42-.445.4.4,0,0,1,.4.44c0,.231,0,.461.006.692a.025.025,0,0,0,.005.013,6.038,6.038,0,0,1,.922.229,6.612,6.612,0,0,1,1.029.561.506.506,0,0,1,.141.745.539.539,0,0,1-.787.116,3.057,3.057,0,0,0-1.18-.524l-.11-.019a1.2,1.2,0,0,0-.019.146c0,.665,0,1.33,0,2,0,.137.054.178.175.219a9.93,9.93,0,0,1,1.14.425,1.969,1.969,0,0,1,1.2,2.07,2.109,2.109,0,0,1-1.415,1.935,9.979,9.979,0,0,1-1.1.292c0,.2,0,.418,0,.641a.4.4,0,0,1-.413.45.411.411,0,0,1-.412-.455c0-.2,0-.407,0-.611,0-.012-.009-.025,0-.012-.4-.092-.781-.161-1.154-.273a3.455,3.455,0,0,1-1.228-.7.543.543,0,0,1-.091-.791.508.508,0,0,1,.773-.057,3.382,3.382,0,0,0,1.6.714c.026,0,.053,0,.093.007Zm.859.271v2.342a1.27,1.27,0,0,0,1.3-1.2A1.312,1.312,0,0,0-291.484,707.152Zm-.856-1.53v-2.179a1.577,1.577,0,0,0-.912.345.878.878,0,0,0,0,1.4A6.98,6.98,0,0,0-292.34,705.622Z"
                          transform="translate(294.936 -701.239)"
                        />
                      </svg>
                      Sales (60)
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCards;
