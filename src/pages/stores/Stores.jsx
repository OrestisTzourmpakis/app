import React, { useContext, useEffect, useState } from "react";

import "./Stores.css";
import { Route, Routes } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useLocation } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import { getStoreById } from "../../services/storeService";

export default function Stores({ id }) {
  const { changeTab } = useContext(TabContext);
  const [stores, setStores] = useState([]);
  const location = useLocation();
  const [companyId, setCompanyId] = useState(id ? id : location.state.id);
  console.log(`Stores location:${location.pathname}`);
  useEffect(async () => {
    try {
      console.log(`To company id:${companyId}`);
      if (id) {
        changeTab(tabs.Stores);
      } else {
        changeTab(tabs.Companies);
      }
      const { data } = await getStoreById(companyId);
      setStores(data);
    } catch (ex) {
      // show snackbar? that something went wrong on loading the data!
      console.log(ex);
    }
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      renderCell: (params) => {
        return (
          <Link
            className="storeNameLink"
            to={`${location.pathname}/${params.row.id}`}
            state={{ ...params.row }}
          >
            {params.row.address}
          </Link>
        );
      },
    },
  ];
  return (
    <DataTablePageTemplate
      title="Stores"
      row={stores}
      columns={columns}
      locationState={{ CompanyId: companyId }}
    />
  );
}
