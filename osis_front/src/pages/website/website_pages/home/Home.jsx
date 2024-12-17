import "./home.css";
import React, { useState, useRef, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bannerLg from "../../../../assets/website/home/hero_large.PNG";
import bannerS1 from "../../../../assets/website/home/hero_S1.PNG";
import bannerS2 from "../../../../assets/website/home/hero_S2.PNG";
import img2 from "../../../../assets/website/home/productImg/kit.png";
import img3 from "../../../../assets/website/home/productImg/phone.png";
import img4 from "../../../../assets/website/home/productImg/xbox.png";
import img5 from "../../../../assets/website/home/productImg/remote.png";
import img6 from "../../../../assets/website/home/productImg/robot.png";
import img7 from "../../../../assets/website/home/productImg/screen.png";
import img8 from "../../../../assets/website/home/productImg/smartwatch.png";
import img9 from "../../../../assets/website/home/productImg/ventilateur.png";

import newcom1 from "../../../../assets/website/home/banner/newcom1.PNG";
import newcom2 from "../../../../assets/website/home/banner/newcom2.PNG";
import newcom_v1 from "../../../../assets/website/home/banner/newcom_v1.PNG";
import newcom_v2 from "../../../../assets/website/home/banner/newcom_v2.PNG";
import discount from "../../../../assets/website/home/banner/discount.PNG";
import banner from "../../../../assets/website/home/banner/banner.png";
import bigbanner from "../../../../assets/website/home/banner/big_banner.PNG";

import {
  categoroies,
  promo,
  topSale,
  client,
} from "../../../../services/homeService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [currectIndex, setcurrectIndex] = useState(0);
  const [value, setValue] = useState(2);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const newCom1 = isMobile ? newcom_v1 : newcom1;
  const newCom2 = isMobile ? newcom_v2 : newcom2;

  const onMouseDown = (e) => {
    isDragging.current = true;
    scrollContainerRef.current.style.cursor = "grabbing";
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    scrollContainerRef.current.style.cursor = "grab";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const tabs = [
    [img2, img3, img4, img5, img6, img7, img8, img9],
    [img2, img3, img4, img5, img6, img7, img8, img9],
    [img2, img3, img4, img5, img6, img7, img8, img9],
    [img2, img3, img4, img5, img6, img7, img8, img9],
  ];

  const topBrand = [
    { img: "", title: "1" },
    { img: "", title: "2" },
    { img: "", title: "3" },
    { img: "", title: "4" },
    { img: "", title: "5" },
    { img: "", title: "6" },
    { img: "", title: "7" },
    { img: "", title: "8" },
    { img: "", title: "9" },
    { img: "", title: "10" },
    { img: "", title: "11" },
    { img: "", title: "12" },
  ];

  const info = [
    {
      img: <i style={{ fontSize: 34 }} class="bi bi-truck"></i>,
      text1: "Fasted Delivery",
      text2: "Delivery in 24/H",
    },
    {
      img: <i style={{ fontSize: 34 }} class="bi bi-clock"></i>,
      text1: "24 Hours Return",
      text2: "Money-back guarantee",
    },
    {
      img: <i style={{ fontSize: 34 }} class="bi bi-credit-card"></i>,
      text1: "Secure Payment",
      text2: "Your money is safe",
    },
    {
      img: <i style={{ fontSize: 34 }} class="bi bi-headset"></i>,
      text1: "Support 24/7",
      text2: "Live contact/message",
    },
  ];
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/category/getAll"
        );
        setCategories(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCategories();
  }, []);
  console.log(categories);

  const getAllSlider = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/slider/getAll"
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPartner = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/partner/getAll"
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProuducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/getAll"
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getAllCategories();
    // getAllSlider();
    // getAllPartner();
  }, []);

  return (
    <div className="home_wrapper">
      <div className="hero">
        <div className="swiper_content">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              {/* <img src={bannerLg} alt="" /> */}
              <div className="swiper_container">
                <p className="swiper_container_title">THE BEST PLACE TO PLAY</p>
                <p className="swiper_container_prod_category">Xbox Consoles</p>
                <p className="swiper_container_description">
                  Save up to 50% on select xbox games. Get 3 month of PC Game
                  Pass for 2$ USD
                </p>
                <button className="swiper_container_btn">
                  <p>Shop Now</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src={bannerLg} alt="" /> */}
              <div className="swiper_container">
                <p className="swiper_container_title">THE BEST PLACE TO PLAY</p>
                <p className="swiper_container_prod_category">Xbox Consoles</p>
                <p className="swiper_container_description">
                  Save up to 50% on select xbox games. Get 3 month of PC Game
                  Pass for 2$ USD
                </p>
                <button className="swiper_container_btn">
                  <p>Shop Now</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src={bannerLg} alt="" /> */}
              <div className="swiper_container">
                <p className="swiper_container_title">THE BEST PLACE TO PLAY</p>
                <p className="swiper_container_prod_category">Xbox Consoles</p>
                <p className="swiper_container_description">
                  Save up to 50% on select xbox games. Get 3 month of PC Game
                  Pass for 2$ USD
                </p>
                <button className="swiper_container_btn">
                  <p>Shop Now</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="mini_card">
          <div className="hero_card">
            {/* <img src={bannerS1} alt="" /> */}
            <div className="hero_card_container">
              <p className="hero_card_container_title">SUMMER SALES</p>
              <p className="hero_card_container_prod_category">
                New Google Pixel 6 Pro
              </p>
              <button className="hero_card_container_btn">
                <p>Shop Now</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="hero_card">
            {/* <img src={bannerS2} alt="" /> */}
            <div className="hero_card_containerr ">
              <p className="hero_card_container_title">SUMMER SALES</p>
              <p className="hero_card_container_prod_category">
                New Google Pixel 6 Pro
              </p>
              <button className="hero_card_container_btn">
                <p>Shop Now</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="info">
        {info.map((info, index) => (
          <div className="info_card" key={index}>
            {info.img}
            <div className="text_wrapper">
              <p style={{ fontWeight: "500", fontSize: 18 }}>{info.text1}</p>
              <p style={{ color: "#6e6e6e" }}>{info.text2}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="popular_categorys">
        <div className="titles">
          <p>Categories</p>
          <p>Popular Categories</p>
        </div>
        <div
          className="categoryes_round_cards"
          ref={scrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {categoroies.map((category, index) => (
            <div className="round_cards" key={index}>
              <div className="rounded_shape">
                <img src={category.img} alt="" />
              </div>
              <p>{category.title}</p>
            </div>
          ))}
          {categoroies.map((category, index) => (
            <div className="round_cards" key={index}>
              <div className="rounded_shape">
                <img src={category.img} alt="" />
              </div>
              <p>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="featured_products">
        <div className="titless">
          <p>Promotion</p>
          <p>Produits en promotion</p>
        </div>
        <div className="featured_products_card_wrapper">
          {promo.map((product, index) => (
            <div
              className="product_card"
              key={index}
              onClick={() => {
                navigate("product_detail");
              }}
            >
              <div className="img">
                <img
                  src={product}
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  alt=""
                />
              </div>
              <div className="card_desc">
                <p className="price">$350</p>
                <p className="product_desc">
                  VEVOR 10'' Shutter Exhaust Fan, High-speed 820...
                </p>
                <div className="rating">
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <p>(25)</p>
                </div>
                <div className="btn_group">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#1868D5", height: "2.6rem" }}
                  >
                    Add to Cart
                  </Button>
                  <div className="favorite">
                    <i class="bi bi-heart" style={{ fontSize: 22 }}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="new_coming">
        <div className="new_coming_card">
          {/* <img src={newCom1} alt="" /> */}
          <div className="new_coming_card_container">
            <p className="new_coming_card_container_title">INTRODUCING NEW</p>
            <p className="new_coming_card_container_prod_category">
              Xiaomi Mi 11 Ultra 12GB+256GB
            </p>
            <p className="new_coming_card_container_description">
              Save up to 50% on select xbox games. Get 3 month of PC Game Pass
              for 2$ USD
            </p>
            <button className="new_coming_card_container_btn">
              <p>Shop Now</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="new_coming_card"
          style={{ backgroundColor: "#d8d8d8s" }}
        >
          {/* <img src={newCom2} alt="" /> */}
          <div className="new_coming_card_container">
            <p className="new_coming_card_container_title">INTRODUCING</p>
            <p
              className="new_coming_card_container_prod_category"
              style={{ color: "#333" }}
            >
              Xiaomi Mi 11 Ultra 12GB+256GB
            </p>
            <p className="new_coming_card_container_description">
              Save up to 50% on select xbox games. Get 3 month of PC Game Pass
              for 2$ USD
            </p>
            <button className="new_coming_card_container_btn">
              <p>Shop Now</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="top_sale_products">
        <div className="top_sale_header">
          <div className="top_sale_titles">
            <p>Meilleures ventes</p>
            <p>Produits les plus vendus</p>
          </div>
          <button>Tous les produits</button>
        </div>
        <div className="top_sale_products_wrapper">
          <div className="vertical_banner">
            <div className="vertical_banner_container">
              <div className="vertical_banner_container_header">
                <p className="vertical_banner_container_title">
                  CC Camera & ACCESSORIES
                </p>
                <p className="vertical_banner_container_prod_discount">
                  40% Discount
                </p>
                <p className="vertical_banner_container_title">
                  CC Camera & ACCESSORIES
                </p>
                <img src="" alt="" />
              </div>
              <button className="vertical_banner_container_btn">
                <p>Shop Now</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="top_sale_products_content">
            {topSale.map((e, i) => (
              <div
                className="top_sale_products_card"
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: "#DEE2E7",
                }}
                key={i}
              >
                <div className="img">
                  <img
                    src={e}
                    style={{
                      objectFit: "contain",
                      height: "80%",
                      width: "100%",
                    }}
                    alt=""
                  />
                </div>
                <div
                  className="card_desc"
                  style={{ gap: "0.2rem", backgroundColor: "white" }}
                >
                  <p className="product_desc">
                    VEVOR 10'' Shutter Exhaust Fan, High-speed 820...
                  </p>
                  <div className="rating">
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    <p>(25)</p>
                  </div>
                  <p
                    className="price"
                    style={{ backgroundColor: "white", color: "#127FFF" }}
                  >
                    $350
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="large_banner">
        <img src={banner} alt="" />
      </div>
      <div className="best_deals">
        <div className="best_deals_header">
          <p>Nos Produits</p>
          <p>Découvrez nos produits</p>
        </div>
        <div className="best_deals_tabs">
          <div className="best_deals_tabs_content">
            <div className="tab_wrapper">
              <button
                onClick={() => setcurrectIndex(0)}
                className={`tab_btn ${currectIndex === 0 ? "active" : ""}`}
              >
                all products
              </button>
              <button
                onClick={() => setcurrectIndex(1)}
                className={`tab_btn ${currectIndex === 1 ? "active" : ""}`}
              >
                Mobile
              </button>
              <button
                onClick={() => setcurrectIndex(2)}
                className={`tab_btn ${currectIndex === 2 ? "active" : ""}`}
              >
                Headphone
              </button>
              <button
                onClick={() => setcurrectIndex(3)}
                className={`tab_btn ${currectIndex === 3 ? "active" : ""}`}
              >
                Smart TV
              </button>
            </div>
            <button>Show All</button>
          </div>
          <div className="best_deals_cards">
            <div className="tab_container" key={currectIndex}>
              {tabs[currectIndex].map((card, index) => (
                <div
                  className="best_dead_tab_cards"
                  style={{ width: "100%" }}
                  key={index}
                >
                  <div className="img">
                    <img
                      src={card}
                      style={{
                        objectFit: "contain",
                        height: "80%",
                        width: "100%",
                      }}
                      alt=""
                    />
                  </div>
                  <div className="card_desc">
                    <p className="price">$350</p>
                    <p className="product_desc">
                      VEVOR 10'' Shutter Exhaust Fan, High-speed 820...
                    </p>
                    <div className="rating">
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      <p>(25)</p>
                    </div>
                    <div className="btn_group">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#1868D5", height: "2.6rem" }}
                        onClick={() => navigate("products")}
                      >
                        Add to Cart
                      </Button>
                      <div className="favorite">
                        <i class="bi bi-heart" style={{ fontSize: 22 }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="xl_large_banner">
        <img src={bigbanner} alt="" />
      </div>
      <div className="top_brand">
        <div className="top_brand_header">
          <div className="tob_brand_titles">
            <p>Nos Clients</p>
          </div>
          <button>Show All</button>
        </div>
        <div className="top_brand_cards">
          {[...client, ...client].map((brand, index) => (
            <div className="brand_card" key={index}>
              <img src={brand} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
