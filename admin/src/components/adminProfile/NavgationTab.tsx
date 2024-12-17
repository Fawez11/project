import { navItems } from "./NavigationConfig";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
// Define the configuration for the navigation tabs

function NavgationTab() {
  console.log("hello");

  return (
    <div className="col-lg-3 col-md-2 col-12 sherah-personals__list mg-top-30">
      <div className="sherah-psidebar sherah-default-bg">
        {/* <!-- Features Tab List --> */}
        <div
          className="list-group sherah-psidebar__list"
          id="list-tab"
          role="tablist"
        >
          {navItems.map((item) => (
            <Link
              data-bs-toggle="list"
              role="tab"
              key={item.id}
              className="list-group-item"
              to={item.href} // Use to prop for routing
            >
              {item.icon}
              <span className="sherah-psidebar__title">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavgationTab;
