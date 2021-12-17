import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { stores } from "../../services/dummyData";
import "./Stores.css";
import { Route, Routes } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link } from "react-router-dom";

export default function Stores() {
  const { changeTab } = useContext(TabContext);
  changeTab(tabs.Stores);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Link className="storeNameLink" to={`/stores/${params.row.id}`}>
            {params.row.name}
          </Link>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 120,
    },
    {
      field: "link",
      headerName: "Website",
      width: 160,
    },
  ];
  return (
    <div className="storesWrapper">
      <div className="storesTitle">
        <h3>Stores</h3>
      </div>
      <div className="storesList">
        <div className="storesTable">
          <DataGrid
            disableSelectionOnClick
            rows={stores}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
