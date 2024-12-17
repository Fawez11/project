import SpecificationsTab from "./tabs/SpecificationsTab";
import FeaturesTab from "./tabs/FeaturesTab";
import ReviewsTab from "./tabs/ReviewsTab";

const ProductTabs = () => {
  const tabs = [
    {
      id: "p_tab_1",
      label: "Specifications",
      component: <SpecificationsTab />,
    },
    { id: "p_tab_2", label: "Features", component: <FeaturesTab /> },
    { id: "p_tab_3", label: "Reviews", component: <ReviewsTab /> },
  ];

  return (
    <div className="product-detail-body sherah-default-bg sherah-border mg-top-30">
      <div className="row">
        <div className="col-12">
          <div className="sherah-product-tabs mg-btm-30">
            <div
              className="sherah-product-tabs__list list-group"
              id="list-tab"
              role="tablist"
            >
              {tabs.map((tab, index) => (
                <a
                  key={tab.id}
                  className={`list-group-item ${index === 0 ? "active" : ""}`}
                  data-bs-toggle="list"
                  href={`#${tab.id}`}
                  role="tab"
                >
                  {tab.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="tab-content" id="nav-tabContent">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                id={tab.id}
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                {tab.component}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
