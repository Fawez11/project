import React from "react";

interface BreadcrumbItem {
  label: string;
  link: string;
  active?: boolean;
}

interface BreadcrumbProps {
  title: string;
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, items }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="sherah-breadcrumb mg-top-30">
          <h2 className="sherah-breadcrumb__title">{title}</h2>
          <ul className="sherah-breadcrumb__list">
            {items.map((item, index) => (
              <li key={index} className={item.active ? "active" : ""}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
