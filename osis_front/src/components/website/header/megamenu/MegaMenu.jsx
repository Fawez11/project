import { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import logoOsis from "../../../../assets/website/home/logos/logo.png";
import apiEndpoints from "../../../../api/api";
import "./megamenu.css";

const SubSubCategory = memo(({ subSubCategory, onClick }) => (
  <div className="subsubcategory_item" onClick={onClick}>
    {subSubCategory.title}
  </div>
));

const SubCategory = memo(
  ({
    subCategory,
    onClick,
    loadingSubSub,
    subSubCategories,
    handleSubSubClick,
  }) => (
    <div className="subcategory_item" onClick={onClick}>
      <h4>{subCategory.title}</h4>
      <div className="subsubcategories_list">
        {loadingSubSub ? (
          <div className="loading-spinner" />
        ) : subSubCategories?.length > 0 ? (
          subSubCategories.map((subSubCategory) => (
            <SubSubCategory
              key={subSubCategory.id}
              subSubCategory={subSubCategory}
              onClick={(e) => handleSubSubClick(e, subSubCategory.id)}
            />
          ))
        ) : null}
      </div>
    </div>
  )
);

const MegaMenu = ({ activeMegaMenu, setActiveMegaMenu, categories }) => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState({});
  const [subSubCategories, setSubSubCategories] = useState({});
  const [loadingSubSub, setLoadingSubSub] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      if (activeMegaMenu && !subCategories[activeMegaMenu]) {
        try {
          // Fetch subcategories
          const subCatsResponse = await apiEndpoints.getData(
            `subCategory/getAll/categoryId/${activeMegaMenu}`
          );

          setSubCategories((prev) => ({
            ...prev,
            [activeMegaMenu]: subCatsResponse || [],
          }));

          // Immediately fetch all subSubCategories for each subCategory
          if (subCatsResponse && subCatsResponse.length > 0) {
            const subSubPromises = subCatsResponse.map((subCat) =>
              apiEndpoints.getData(
                `subSubCategory/getAll/subCategoryId/${subCat.id}`
              )
            );

            const subSubResponses = await Promise.all(subSubPromises);

            const subSubMap = {};
            subCatsResponse.forEach((subCat, index) => {
              subSubMap[subCat.id] = subSubResponses[index] || [];
            });

            setSubSubCategories((prev) => ({
              ...prev,
              ...subSubMap,
            }));
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
    };

    fetchAllData();
  }, [activeMegaMenu]);

  const handleClose = useCallback(() => {
    setActiveMegaMenu(null);
  }, [setActiveMegaMenu]);

  const handleSubSubClick = useCallback(
    (e, id) => {
      e.stopPropagation();
      navigate(`/products/subsubcategory/${id}`);
      handleClose();
    },
    [navigate, handleClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="mega_menu_overlay" onClick={handleClose} />
      <div className="mega_menu">
        <div className="mega_menu_header">
          <h3>{categories.find((c) => c.id === activeMegaMenu)?.title}</h3>
          <div className="mega_menu_header_content">
            <img
              src={logoOsis}
              alt="Logo"
              className="mega_menu_logo"
              onClick={() => {
                navigate("/");
                handleClose();
              }}
            />
            <div className="mega_menu_close" onClick={handleClose}>
              ✕
            </div>
          </div>
        </div>
        <div className="mega_menu_content">
          <div className="categories_sidebar">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`sidebar_category ${
                  activeMegaMenu === category.id ? "active" : ""
                }`}
                onClick={() => setActiveMegaMenu(category.id)}
              >
                <span>{category.title}</span>
              </div>
            ))}
          </div>
          <div className="subcategories_content">
            {subCategories[activeMegaMenu]?.map((subCategory) => (
              <SubCategory
                key={subCategory.id}
                subCategory={subCategory}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/subcategory/${subCategory.id}`);
                  handleClose();
                }}
                loadingSubSub={loadingSubSub}
                subSubCategories={subSubCategories[subCategory.id]}
                handleSubSubClick={handleSubSubClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MegaMenu);
