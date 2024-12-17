import "./middleBar.css";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import { ToggleContext } from "../../../../context/ToggleContext";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { SwipeableTemporaryDrawer } from "../../drawers/SideBar/SideBar";
import logoOsis from "../../../../assets/website/home/logos/logo.png";
import { CartModal } from "../../modals/cartModal/CartModal";
import { FavoriteModal } from "../../modals/FavoriteModal/FavoriteModal";
import { useNavigate } from "react-router-dom";
import apiEndpoints from "../../../../api/api";

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const MiddleBar = () => {
  const { isCartOpen, toggleCart } = useContext(ToggleContext);
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const toggleDrawer = (open) => {
    setIsOpen(open);
  };

  const toggleFavDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsFavOpen(open);
  };

  const searchProducts = useCallback(
    debounce(async (query) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await apiEndpoints.getData(
          `/product/search?query=${query}`
        );
        if (response.success) {
          setSuggestions(response.products);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart();
  };

  return (
    <>
      <div className="middlebar_wrapper">
        <div className="logo">
          <img src={logoOsis} alt="" />
        </div>
        <div className="search_box_wrapper" ref={searchRef}>
          <div className="search_box">
            <div className="search_input">
              <div className="input_field">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchProducts(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
              </div>
              <button className="search_btn">Rechercher</button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="search_suggestions">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="suggestion_item"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className="suggestion_image">
                      <img
                        src={product.media[0]?.filePath}
                        alt={product.name}
                      />
                    </div>
                    <div className="suggestion_content">
                      <h4>{product.name}</h4>
                      {product.subCharacteristics?.length > 0 && (
                        <div className="suggestion_chars">
                          {product.subCharacteristics
                            .slice(0, 2)
                            .map((char, idx) => (
                              <span key={idx} className="char_tag">
                                {char.name}: {char.value}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="middlenav_btn_group">
          <IconButton
            aria-label="favorites"
            size="large"
            onClick={toggleFavDrawer(true)}
          >
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
              badgeContent={count}
            >
              <FavoriteBorderIcon sx={{ color: "white", fontSize: 24 }} />
            </Badge>
          </IconButton>
          <IconButton aria-label="cart" size="large" onClick={handleCartClick}>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
              badgeContent={count}
            >
              <ShoppingCartOutlinedIcon sx={{ color: "white", fontSize: 24 }} />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="profile"
            size="large"
            onClick={() => navigate("/profile")}
          >
            <AccountCircleOutlinedIcon sx={{ color: "white", fontSize: 30 }} />
          </IconButton>
        </div>
      </div>
      <div className="mobile_nav">
        <label className="container">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={() => {
              toggleDrawer(!isOpen);
            }}
          />
          <div className="checkmark">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </label>
        <div className="logo"></div>
        <IconButton aria-label="cart" size="large">
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "grey",
                color: "black",
              },
            }}
            badgeContent={count}
          >
            <ShoppingCartOutlinedIcon sx={{ color: "black" }} />
          </Badge>
        </IconButton>
        <div style={{ position: "absolute" }}>
          <SwipeableTemporaryDrawer
            isOpen={isOpen}
            toggleDrawer={toggleDrawer}
          />
        </div>
      </div>
      {isCartOpen && <CartModal />}
      <Drawer anchor="right" open={isFavOpen} onClose={toggleFavDrawer(false)}>
        <FavoriteModal toggleFavDrawer={toggleFavDrawer} />
      </Drawer>
    </>
  );
};
