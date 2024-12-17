// admin/src/components/navigation/menuItems/SideBarItem.tsx
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

interface SideBarItemProps {
  title: string;
  iconSvg: JSX.Element;
  menuItems: { href: string; label: string }[];
  dropdown: boolean;
  href: string;
  isOpen: boolean;
  onToggle: () => void;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  title,
  iconSvg,
  menuItems,
  dropdown,
  href,
  onToggle,
  isOpen,
}) => {
  return (
    <li onClick={onToggle}>
      {dropdown && (
        <a className={`${isOpen ? "" : "collapsed"}`}>
          <span className="menu-bar__text">
            {iconSvg}
            <span className="menu-bar__name">{title}</span>
          </span>
          {dropdown && (
            <span className="sherah__toggle">
              <FontAwesomeIcon
                icon={
                  isOpen
                    ? (faAngleDown as IconProp)
                    : (faAngleRight as IconProp)
                }
              />
            </span>
          )}
        </a>
      )}
      {!dropdown && (
        <Link
          data-bs-toggle="collapse"
          to={href}
          className={`${isOpen ? "" : "collapsed"}`}
        >
          <span className="menu-bar__text">
            {iconSvg}
            <span className="menu-bar__name">{title}</span>
          </span>
          {dropdown && (
            <span className="sherah__toggle">
              <FontAwesomeIcon
                icon={
                  isOpen
                    ? (faAngleDown as IconProp)
                    : (faAngleRight as IconProp)
                }
              />
            </span>
          )}
        </Link>
      )}
      {dropdown && (
        <div
          id="menu-item__orders"
          data-bs-parent="#sherahMenu"
          className={`collapse sherah__dropdown ${isOpen ? "show" : ""}`}
        >
          {menuItems.length > 0 && (
            <ul className="menu-bar__one-dropdown">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.href}>
                    <span className="menu-bar__text">
                      <span className="menu-bar__name">{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

export default SideBarItem;
