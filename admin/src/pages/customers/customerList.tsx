import CustomerTable from "../../components/customers/CustomerTable";
import Breadcrumb from "../../components/common/Breadcrumb";

const CustomerList = () => {
  return (
    <div className="sherah-dsinner">
      <Breadcrumb
        title="Pages"
        items={[
          { label: "Home", link: "#" },
          { label: "Customer List", link: "customer-list.html", active: true },
        ]}
      />
      <CustomerTable />
    </div>
  );
};

export default CustomerList;
