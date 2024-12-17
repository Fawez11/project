import { Outlet } from "react-router-dom";
import NavgationTab from "../../components/adminProfile/NavgationTab";

function MainProfile() {
  return (
    <div className="sherah-body">
      {/* <!-- Dashboard Inner --> */}
      <div className="sherah-dsinner">
        {/* <!-- Sherah Breadcrumb --> */}
        <div className="sherah-breadcrumb mg-top-30">
          <h2 className="sherah-breadcrumb__title">Setting</h2>
          <ul className="sherah-breadcrumb__list">
            <li>
              <a href="#">Home</a>
            </li>
            <li className="active">
              <a href="profile-info.html">Personal Information</a>
            </li>
          </ul>
        </div>
        {/* <!-- End Sherah Breadcrumb --> */}
        <div className="sherah-personals">
          <div className="row">
            <NavgationTab />

            <div className="col-lg-9 col-md-10 col-12  sherah-personals__content mg-top-30">
              <div className="sherah-ptabs">
                <div className="sherah-ptabs__inner">
                  <div className="tab-content" id="nav-tabContent">
                    {/* <!--  Features Single Tab --> */}
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Dashboard Inner --> */}
    </div>
  );
}

export default MainProfile;
