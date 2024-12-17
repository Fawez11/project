// admin/src/components/navigation/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import ToggleSvg from "../svgComponenents/header/toggleSvg";
import SearchSVg from "../svgComponenents/SearchSVg";
import FullScreenSvg from "../svgComponenents/header/FullScreenSvg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import "../../styles/Header.css";
import ProfileSvg from "../svgComponenents/ProfileSvg";
import BanniéreSvg from "../svgComponenents/BanniéreSvg";
import LogoutSvg from "../svgComponenents/logoutSvg";

interface SidebarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<SidebarProps> = ({ toggleMenu, isMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const htmlElementRef = useRef(document.documentElement);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDark") === "true";
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/admin");
    setShowDropdown(false);
  };

  const handleSliderManagement = () => {
    navigate("/sliderManagement");
    setShowDropdown(false);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      htmlElementRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const actionElements = document.querySelectorAll(
      "#sherah-sidebarmenu__dark, #sherah-dark-light"
    );
    actionElements.forEach((el) => {
      if (isDarkMode) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }, [isDarkMode]);

  return (
    <header className={`sherah-header ${isMenuOpen ? "sherah-close" : ""}`}>
      <div className="container g-0">
        <div className="row g-0">
          <div className="col-12">
            <div className="sherah-header__inner">
              <div className="sherah-header__middle">
                <ToggleSvg toggleMenu={toggleMenu} />
                <div className="sherah-header__left">
                  <div className="sherah-header__form">
                    <form className="sherah-header__form-inner" action="#">
                      <button className="search-btn" type="submit">
                        <SearchSVg />
                      </button>
                      <input
                        name="s"
                        value={searchQuery}
                        type="text"
                        placeholder="Search"
                        onChange={handleSearch}
                      />
                    </form>
                  </div>
                </div>
                <div className="sherah-header__right">
                  <div className="sherah-header__group">
                    <div className="sherah-header__group-two">
                      <div className="sherah-header__right">
                        <div className="sherah-header__zoom">
                          <button
                            id="sherah-header__full"
                            onClick={toggleFullscreen}
                          >
                            <FullScreenSvg />
                          </button>
                        </div>

                        <div
                          className="sherah-flex__center--top interactive-dropdown"
                          onClick={() => setShowDropdown(!showDropdown)}
                        >
                          <div className="sherah-header__author-img">
                            <img
                              src={user?.photoUrl || "img/profile-pic.png"}
                              alt={user?.firstName || "User"}
                            />
                          </div>
                          <div className="sherah-header__author--info sherah-dflex sherah-dflex__base">
                            <h4 className="sherah-header__author--title sherah-dflex sherah-dflex__column">
                              {user?.firstName || "User"}{" "}
                              <span className="sherah-header__author--text">
                                {user?.role || "Admin"}
                              </span>
                            </h4>
                          </div>

                          <div
                            className={`sherah-dropdown-card sherah-dropdown-card__profile sherah-border ${
                              showDropdown ? "show" : ""
                            }`}
                          >
                            <ul className="sherah-dropdown-card_list">
                              <li className="dropdown-item">
                                <div
                                  className="sherah-dropdown-card-info interactive-item"
                                  onClick={handleProfileClick}
                                >
                                  <div className="sherah-dropdown-card__img sherah-color1__bg">
                                    <ProfileSvg />
                                  </div>
                                  <h4 className="sherah-dropdown-card-name">
                                    My Profile
                                  </h4>
                                </div>
                              </li>

                              <li className="dropdown-item">
                                <div
                                  className="sherah-dropdown-card-info interactive-item"
                                  onClick={handleSliderManagement}
                                >
                                  <div className="sherah-dropdown-card__img sherah-color1__bg">
                                    <BanniéreSvg />
                                  </div>
                                  <h4 className="sherah-dropdown-card-name">
                                    Banniéres
                                  </h4>
                                </div>
                              </li>

                              <li className="dropdown-item">
                                <div
                                  className="sherah-dropdown-card-info interactive-item"
                                  onClick={handleLogout}
                                >
                                  <div className="sherah-dropdown-card__img sherah-color1__bg">
                                    <LogoutSvg />
                                  </div>
                                  <h4 className="sherah-dropdown-card-name">
                                    Logout
                                  </h4>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
