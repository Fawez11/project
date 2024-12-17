import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <section className="sherah-adashboard sherah-show">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sherah-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
