import React, { Children, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Add, ArrowBack } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import {
  Box,
  Container,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import useTable from "./useTable";
import { stores } from "../../services/dummyData";

function DataTablePageTemplate({
  title,
  row,
  columns,
  locationState,
  hideBackButton,
  hideAddButton,
}) {
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  let navigate = useNavigate();
  const headCells = [
    { id: "name", label: "Store Name" },
    { id: "address", label: "Address" },
    { id: "link", label: "WebSite" },
  ];
  const {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  } = useTable(stores, headCells, ["name", "link", "address"]);

  const assignUser = () => {
    navigate(`${location.pathname}/assignUser`, { state: locationState });
  };

  const handleClick = (e) => {
    e.preventDefault();
    let addPath = location.pathname + "/add";
    navigate(addPath, { state: locationState });
  };

  return (
    <>
      <Container>
        <Grid direction="column" style={{ margin: "20px" }}>
          <Grid item container justifyContent="center">
            <Box display="flex"></Box>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <TableContainer key="tableContainer">
                <TableHeader />
                <TableBody>
                  {recordsAfterPaging().map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.link}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
              <TablePaginationCustom />
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* <div className="storesWrapper">
        <div className="storesTitle">
          {hideBackButton && <div></div>}
          <h3>{title}</h3>
          {location.pathname.includes("store") && (
            <div className="addButton sidebarGreenBg" onClick={assignUser}>
              <Add />
              <h3>Assign User</h3>
            </div>
          )}
          {!hideAddButton && (
            <div
              className="addButton sidebarGreenBg"
              onClick={(e) => handleClick(e)}
            >
              <Add />
              <h3>Add</h3>
            </div>
          )}
          {hideAddButton && <div></div>}
        </div>
        <div className="storesList">
          <div className="storesTable">
            <DataGrid
              disableSelectionOnClick
              rows={row}
              columns={columns}
              pageSize={5}
              getRowId={(row) => (row.id ? row.id : row.company.id)}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </div>
      </div> */}
    </>
  );
}

export default DataTablePageTemplate;
