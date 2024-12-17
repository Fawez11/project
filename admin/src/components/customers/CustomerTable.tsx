import CustomerTableRow from "./CustomerTableRow";

const CustomerTable = () => {
  const customers = [
    {
      id: 1,
      name: "Mendorcart",
      image: "img/vendor-1.png",
      email: "margaretak@gmail.com",
      orders: "99",
      country: "USA",
      status: "Active",
      joinDate: "19/09/2022",
    },
    // Add more customer data...
  ];

  return (
    <div className="sherah-table sherah-page-inner sherah-border sherah-default-bg mg-top-25">
      <table
        id="sherah-table__vendor"
        className="sherah-table__main sherah-table__main-v3"
      >
        <thead className="sherah-table__head">
          <tr>
            <th className="sherah-table__column-2 sherah-table__h2">Name</th>
            <th className="sherah-table__column-3 sherah-table__h3">Email</th>
            <th className="sherah-table__column-4 sherah-table__h4">Orders</th>
            <th className="sherah-table__column-5 sherah-table__h5">Country</th>
            <th className="sherah-table__column-7 sherah-table__h6">Status</th>
            <th className="sherah-table__column-8 sherah-table__h7">Join On</th>
            <th className="sherah-table__column-9 sherah-table__h8">Action</th>
          </tr>
        </thead>
        <tbody className="sherah-table__body">
          {customers.map((customer) => (
            <CustomerTableRow key={customer.id} customer={customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
