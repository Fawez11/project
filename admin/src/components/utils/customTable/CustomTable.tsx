import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../loaders/Loader";

const CustomTable = ({
  columns,
  data,
  filteredData,
  setFilteredData,
  rowNavigation,
  filterLogic,
  clickableRows,
  routes,
  isLoading,
  selectedRows,
  setSelectedRows,
  createRowItem,
  handleDisable,
  handleEnable,
  handleDelete,
}: {
  columns: any;
  data: any;
  filteredData: any;
  setFilteredData: any;
  rowNavigation: string;
  filterLogic: any;
  clickableRows: boolean;
  routes: any;
  isLoading: boolean;
  selectedRows: any;
  setSelectedRows: any;
  createRowItem: any;
  handleDisable: any;
  handleEnable: any;
  handleDelete: any;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (
    query: string,
    data: any[],
    filterLogic: (item: any, query: string) => boolean
  ) => {
    if (query) {
      setFilteredData(data.filter((item) => filterLogic(item, query)));
    } else {
      setFilteredData(data);
    }
  };

  const handleRowClick = (row: any) => {
    if (!clickableRows) return;
    navigate(`/${rowNavigation}/${row.id}`);
  };

  useEffect(() => {
    handleSearch(searchQuery, data, filterLogic);
  }, [searchQuery]);
  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }
  return (
    <div className="col-12">
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <>
        <ul className="sherah-breadcrumb__list">
          <li>
            <Link to="/">Home</Link>
          </li>
          {routes.map((route: any, index: number) => {
            return route.active ? (
              <li className="active" key={index}>
                <Link to={route.ref}>{route.name}</Link>
              </li>
            ) : (
              <li key={index}>
                <Link to={route.ref}>{route.name}</Link>
              </li>
            );
          })}
        </ul>
        <div
          style={{
            width: "100%",
            marginTop: "2%",
            marginBottom: "2%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            style={{ paddingLeft: "5%", color: "black", width: "30%" }}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ width: "50%", display: "flex", gap: "3%" }}>
            <button
              onClick={createRowItem}
              style={{
                width: "31%",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Create
            </button>
            <div
              style={{
                width: "1px",
                backgroundColor: "gray",
                height: "100%",
              }}
            />
            <button
              disabled={selectedRows.length === 0}
              onClick={() => handleDisable(selectedRows)}
              style={{
                width: "31%",
                backgroundColor: selectedRows.length === 0 ? "#ccc" : "orange",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Disable
            </button>
            <button
              disabled={selectedRows.length === 0}
              onClick={() => handleEnable(selectedRows)}
              style={{
                width: "31%",
                backgroundColor: selectedRows.length === 0 ? "#ccc" : "green",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Enable
            </button>
            <button
              disabled={selectedRows.length === 0}
              onClick={() => {
                handleDelete(selectedRows);
              }}
              style={{
                width: "31%",
                backgroundColor: selectedRows.length === 0 ? "#ccc" : "red",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={searchQuery ? filteredData : data}
          fixedHeader
          pagination
          highlightOnHover
          pointerOnHover={clickableRows}
          onRowClicked={handleRowClick} // Use the onRowClicked prop
          selectableRows
          onSelectedRowsChange={(state) => {
            setSelectedRows(state.selectedRows);
            console.log("selected rows", state.selectedRows);
          }}
        />
      </>
    </div>
  );
};
// )}

export default CustomTable;
