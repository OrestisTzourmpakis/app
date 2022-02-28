import React, { useContext, useEffect, useState } from "react";

import "./Stores.css";
import { Route, Routes } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import {
  getStoreById,
  getStoreByEmail,
  deleteStore,
} from "../../services/storeService";
import { UserContext } from "../../contexts/userContext";
import {
  Box,
  Button,
  Container,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  Edit,
  Visibility,
  DeleteOutline,
  Delete,
  Add,
  ArrowBack,
} from "@material-ui/icons";
import ConfirmDialog from "../../components/common/confirmDialog";
import { ConfirmationDialogContext } from "../../contexts/confirmationDialogContext";
import { red } from "@material-ui/core/colors";
import useTable from "../../components/common/useTable";

export default function Stores() {
  const { changeTab } = useContext(TabContext);
  const [locationState, setLocationState] = useState();
  const { isAdmin, authed } = useContext(UserContext);
  const [admin, setAdmin] = useState(isAdmin());
  const [stores, setStores] = useState([]);
  const { openDialog } = useContext(ConfirmationDialogContext);
  const navigate = useNavigate();
  const location = useLocation();
  const storesColumn = [
    { id: "address", label: "Address" },
    { id: "actions", label: "Actions", avoidSearch: true },
  ];
  const {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  } = useTable(stores, storesColumn, ["address"]);

  const handleDelete = async (id) => {
    // try catch? prwta 8a kanw to set state wste na dei3w oti ola comple
    // kai meta 8a kalesw to api gia na kanw delete!!!
    let storesInitial = [...stores];
    try {
      if (id === null) return;
      let storesTemp = stores.filter((c) => c.id !== id);
      setStores([...storesTemp]);
      // call the api!!
      await deleteStore(id);
    } catch (e) {
      // delete the store here!!!
      setStores([...storesInitial]);
    }
  };

  const handleAddStore = (e) => {
    e.preventDefault();
    const addPath = location.pathname + "/add";
    console.log(locationState);
    navigate(addPath, { state: { ...locationState } });
  };

  const handleAssignUser = () => {
    navigate(`${location.pathname}/assignUser`, { state: locationState });
  };

  useEffect(() => {
    const Init = async () => {
      try {
        // console.log(`To company id:${companyId}`);
        if (isAdmin()) {
          changeTab(tabs.Companies);
          const { data: allStores } = await getStoreById(location.state.id);
          setStores(allStores);
          setLocationState({ CompanyId: location.state.id });
        } else {
          console.log(authed);
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
    };
    Init();
  }, [authed]);

  const handleEditClick = (row) => {
    console.log("Clicked here boy");
    navigate(`${location.pathname}/${row.id}`, {
      state: {
        ...row,
      },
    });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {admin ? (
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        ) : (
          <div></div>
        )}

        <Typography variant="body1">Stores</Typography>
        <Box display="flex">
          <Button
            onClick={handleAssignUser}
            color="primary"
            startIcon={<Add />}
            style={{ marginRight: "10px" }}
            variant="contained"
            size="small"
          >
            Assign User
          </Button>
          <Button
            onClick={handleAddStore}
            color="primary"
            startIcon={<Add />}
            variant="contained"
            size="small"
          >
            Add Store
          </Button>
        </Box>
      </Box>
      <Box
        style={{ marginTop: "20px" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <TableContainer key="tableContainer">
          <TableHeader />
          <TableBody>
            {recordsAfterPaging().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  <Box display="flex">
                    <IconButton
                      onClick={() => handleEditClick(item)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      //  onClick={handleOnDelete}
                      onClick={() => {
                        openDialog({
                          title: "Delete store?",
                          body: "Are you sure you want to delete this store?",
                          yesButton: "Yes",
                          noButton: "No",
                          callback: () => handleDelete(item.id),
                        });
                      }}
                    >
                      <DeleteOutline color="error" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <TablePaginationCustom />
      </Box>
    </Container>
  );
}
