import { useEffect, useState, useContext, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleContext } from "../../../../context/ToggleContext";
import apiEndpoints from "../../../../api/api";
import "./navbar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MegaMenu from "../megamenu/MegaMenu";

// Memoize the category item component
const CategoryItem = memo(({ category, onClick }) => (
  <div
    className="categories_list_item"
    onClick={(e) => {
      e.stopPropagation();
      onClick(category.id);
    }}
  >
    <div className="first_child">
      {category.title === "Informatique" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h6z" />
        </svg>
      )}
      <p>{category.title}</p>
    </div>
  </div>
));

export const Navbar = () => {
  const navigate = useNavigate();
  const { isToggled, toggle } = useContext(ToggleContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  // Memoize handlers
  const handleToggleClick = useCallback(
    (e) => {
      e.stopPropagation();
      toggle();
    },
    [toggle]
  );

  const handleCategoryClick = useCallback(
    (categoryId) => {
      // Set MegaMenu first, then close dropdown
      setActiveMegaMenu(categoryId);
      requestAnimationFrame(() => {
        toggle(); // Close the dropdown after MegaMenu is set
      });
    },
    [toggle]
  );

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isToggled && !e.target.closest(".all_categories")) {
        toggle();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isToggled, toggle]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiEndpoints.getData("category/getAll");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading || error) return null;

  return (
    <>
      <div className="navbar_wrapper">
        <div className="navbar_routes">
          <div className="all_categories">
            <div className="categories_collapse" onClick={handleToggleClick}>
              <p style={{ color: "white" }}>Catégories</p>
              <KeyboardArrowDownRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: "2rem",
                  transform: isToggled ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s ease-in",
                }}
              />
            </div>
            {isToggled && (
              <div className="categories_list active">
                <div className="categories_list_wrapper">
                  {categories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      onClick={handleCategoryClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="route_pages">
            <p onClick={() => navigate("/")}>Home</p>
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>
        <div className="navbar_account_btn">
          <div
            className="entreprise_btn"
            onClick={() => navigate("/section_entreprise")}
          >
            Entreprise
            <ArrowForwardIosIcon className="r_arrow" fontSize="small" />
          </div>
        </div>
      </div>

      {activeMegaMenu && (
        <MegaMenu
          activeMegaMenu={activeMegaMenu}
          setActiveMegaMenu={setActiveMegaMenu}
          categories={categories}
        />
      )}
    </>
  );
};

export default memo(Navbar);
