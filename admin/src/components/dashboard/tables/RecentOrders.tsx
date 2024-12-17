function RecentOrders() {
  return (
    <div className="sherah-table sherah-default-bg sherah-border mg-top-30">
      <div className="sherah-table__heading">
        <h3 className="sherah-heading__title mb-0">Recent Orders</h3>
      </div>
      {/* <!-- sherah Table --> */}
      <table
        id="sherah-table__main"
        className="sherah-table__main sherah-table__main--front sherah-table__main-v1"
      >
        {/* <!-- sherah Table Head --> */}
        <thead className="sherah-table__head">
          <tr>
            <th className="sherah-table__column-1 sherah-table__h1">
              Order Id
            </th>
            <th className="sherah-table__column-2 sherah-table__h2">
              Customer
            </th>
            <th className="sherah-table__column-3 sherah-table__h3">Prodcut</th>
            <th className="sherah-table__column-4 sherah-table__h4">Amount</th>
            <th className="sherah-table__column-5 sherah-table__h5">Vendor</th>
            <th className="sherah-table__column-7 sherah-table__h7">Status</th>
          </tr>
        </thead>
        {/* <!-- sherah Table Body --> */}
        <tbody className="sherah-table__body">
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025417</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-1.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Alshan</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/product-1.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Leather bag</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$55.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Garikokar Fashion</h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color2 sherah-color2__bg--opactity">
                Paid
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025418</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-2.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Gogdukh</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-2.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Fashion jeket</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$98.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Hamasto Fashion</h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color3 sherah-color3__bg--opactity">
                Pending
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025419</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-3.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Nichara Jhon</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/product-3.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Cotton tops</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$60.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Technologies</h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color1 sherah-color1__bg--opactity">
                Unpaid
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025420</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-4.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Aslihan Jaga</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/product-4.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Black half shirt</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$50.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Design Fashion </h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color3 sherah-color3__bg--opactity">
                Pending
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025421</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-5.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Nishachor</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/product-5.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Leather shoe</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$85.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Nihari Shoes</h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color1 sherah-color1__bg--opactity">
                Unpaid
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025417</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-1.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Alshan</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/product-1.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Leather bag</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$55.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Garikokar Fashion</h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color2 sherah-color2__bg--opactity">
                Paid
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025418</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-2.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Gogdukh</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-2.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Fashion jeket</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$98.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Hamasto Fashion</h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color3 sherah-color3__bg--opactity">
                Pending
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025419</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-3.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Nichara Jhon</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/product-3.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Cotton tops</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$60.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Technologies</h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color1 sherah-color1__bg--opactity">
                Unpaid
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025420</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img" />
                <img src="img/customer-4.png" alt="#" />
              </div>
              <div className="sherah-table__product-content">
                <p className="sherah-table__product-desc">Aslihan Jaga</p>
              </div>
              {/* </div> */}
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/product-4.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Black half shirt</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$50.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Design Fashion </h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color3 sherah-color3__bg--opactity">
                Pending
              </div>
            </td>
          </tr>
          <tr>
            <td className="sherah-table__column-1 sherah-table__data-1">
              <div className="sherah-table__product--id">
                <p className="crany-table__product--number">
                  <a href="#">#Kz025421</a>
                </p>
              </div>
            </td>
            <td className="sherah-table__column-2 sherah-table__data-2">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/customer-5.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Nishachor</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-3 sherah-table__data-3">
              <div className="sherah-table__product">
                <div className="sherah-table__product-img">
                  <img src="img/product-5.png" alt="#" />
                </div>
                <div className="sherah-table__product-content">
                  <p className="sherah-table__product-desc">Leather shoe</p>
                </div>
              </div>
            </td>
            <td className="sherah-table__column-4 sherah-table__data-4">
              <h5 className="sherah-table__inner--title">$85.00</h5>
            </td>
            <td className="sherah-table__column-5 sherah-table__data-5">
              <h5 className="sherah-table__inner--title">Nihari Shoes</h5>
            </td>
            <td className="sherah-table__column-7 sherah-table__data-7">
              <div className="sherah-table__status sherah-color1 sherah-color1__bg--opactity">
                Unpaid
              </div>
            </td>
          </tr>
        </tbody>
        {/* <!-- End sherah Table Body --> */}
      </table>
      {/* <!-- End sherah Table --> */}
    </div>
  );
}

export default RecentOrders;
