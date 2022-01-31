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
import { Edit, Visibility, DeleteOutline, Delete } from "@mui/icons-material";
import ConfirmDialog from "../../components/common/confirmDialog";
import { ConfirmationDialogContext } from "../../contexts/confirmationDialogContext";

export default function Stores() {
  const { changeTab } = useContext(TabContext);
  const [locationState, setLocationState] = useState();
  const { isAdmin, authed } = useContext(UserContext);
  const [stores, setStores] = useState([]);
  const { openDialog, resetDialog } = useContext(ConfirmationDialogContext);
  const [selectedId, setSelectedId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = (id) => {
    // try catch? prwta 8a kanw to set state wste na dei3w oti ola comple
    // kai meta 8a kalesw to api gia na kanw delete!!!
    try {
      console.log("In the handle delete");
      console.log("The selected id :");
      console.log(id);
      if (id === null) return;
      let storesTemp = stores.filter((c) => c.id !== id);
      console.log("Stores temp:");
      console.log(storesTemp);
      setStores([...storesTemp]);
    } catch (e) {
      // delete the store here!!!
      console.log("Error in the handleDelete");
    }
  };

  const dialogChildren = (
    <>
      <h1>Hello there big boy</h1>
    </>
  );

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
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              onClick={() => {
                //setSelectedId(params.row.id);
                //setShowDialog(true);
                //resetDialog();
                openDialog({
                  title: "Hello there",
                  body: "This is the body",
                  yesButton: "Yes",
                  noButton: "No",
                  callback: () => handleDelete(params.row.id),
                });
              }}
            />
          </>
        );
      },
    },
    // open dialog!! -> 8a
  ];
  return (
    <>
      <DataTablePageTemplate
        title="Stores"
        row={stores}
        columns={columns}
        locationState={{ ...locationState }}
        dialogTitle="Delete this item?"
        confirmDialog={handleDelete}
        dialogChildren={dialogChildren}
      />
      <ConfirmDialog
        title="Do you want to delete this item?"
        open={showDialog}
        setOpen={setShowDialog}
        onConfirm={handleDelete}
      >
        {dialogChildren}
      </ConfirmDialog>
    </>
  );
}
