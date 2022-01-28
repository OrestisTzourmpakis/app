import React, { useContext, useEffect, useState } from "react";

import "./Stores.css";
import { Route, Routes } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import { getStoreById, getStoreByEmail } from "../../services/storeService";
import { UserContext } from "../../contexts/userContext";
import { Button } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";

export default function Stores() {
  const { changeTab } = useContext(TabContext);
  const [locationState, setLocationState] = useState();
  const { isAdmin, authed } = useContext(UserContext);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // const [companyId, setCompanyId] = useState(null);
  console.log(`Stores location:${location.pathname}`);
  useEffect(async () => {
    try {
      // console.log(`To company id:${companyId}`);
      if (isAdmin()) {
        changeTab(tabs.Companies);
        const { data: allStores } = await getStoreById(location.state.id);
        setStores(allStores);
        setLocationState({ CompanyId: location.state.id });
      } else {
        changeTab(tabs.Stores);
        const { data: store } = await getStoreByEmail(authed.email);
        setStores(store);
        // setCompanyId(authed.companyId);
        setLocationState({ OwnerEmail: authed.email });
      }
    } catch (ex) {
      // show snackbar? that something went wrong on loading the data!
      console.log(ex);
    }
  }, []);
  const handleEditClick = (row) => {
    console.log("Clicked here boy");
    navigate(`${location.pathname}/${row.id}`, {
      state: {
        ...row,
      },
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      renderCell: (params) => {
        return <>{params.row.address}</>;
      },
    },
    {
      field: "edit",
      headerName: "Edit / View",
      renderCell: (params) => {
        return (
          <>
            <Button
              color="secondary"
              onClick={() => handleEditClick(params.row)}
              variant="contained"
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <DataTablePageTemplate
      title="Stores"
      row={stores}
      columns={columns}
      locationState={{ ...locationState }}
    />
  );
}
