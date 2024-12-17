import { useState } from "react";
import DashboardSvg from "../svgComponenents/DashboardSvg";
import menuItems from "./menuItems/MenuConfig";
import SideBarItem from "./menuItems/SideBarItem";
interface SidebarProps {
  toggleMenu: () => void; // Function to toggle the menu
  isMenuOpen: boolean; // Boolean to indicate if the menu is open
}

const Sidebar: React.FC<SidebarProps> = ({ toggleMenu, isMenuOpen }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleDropdownToggle = (index: number) => {
    console.log("dropdown index", index);
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className={`sherah-smenu ${isMenuOpen ? "sherah-close" : ""}`}>
      {/* Admin Menu */}
      <div className="admin-menu">
        {/* Logo */}
        <div className="logo sherah-sidebar-padding">
          <a href="index.html">
            <img
              className="sherah-logo__main"
              src="http://localhost:5000/api/uploads/Informatique.png"
              alt="#"
            />
          </a>
          <div
            onClick={toggleMenu}
            className="sherah__sicon close-icon d-xl-none"
          >
            <DashboardSvg />
          </div>
        </div>
        {/* Main Menu */}
        <div className="admin-menu__one sherah-sidebar-padding">
          <div className="menu-bar">
            <ul className="menu-bar__one sherah-dashboard-menu" id="sherahMenu">
              {menuItems.map((item, index) => (
                <SideBarItem
                  key={index}
                  title={item.title}
                  iconSvg={item.iconSvg}
                  menuItems={item.menuItems}
                  dropdown={item.dropdown}
                  href={item.href || ""}
                  isOpen={activeIndex === index} // Pass active state
                  onToggle={() => handleDropdownToggle(index)} // Pass toggle function
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
