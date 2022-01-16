import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Add, ArrowBack } from "@mui/icons-material";

function DataTablePageTemplate({
  title,
  row,
  columns,
  locationState,
  hideBackButton,
  hideAddButton,
}) {
  const location = useLocation();
  // to back button tha exei auto edw pera to path!!!
  // twra gia na ftia3w to add apla pros8ese
  console.log(location.pathname);
  let navigate = useNavigate();
  const assignUser = () => {
    console.log("Assign User");
    // pass the state of the current company
    // if the state is null take it from the context that you will create!
    navigate(`${location.pathname}/assignUser`, { state: locationState });
  };
  const handleClick = (e) => {
    e.preventDefault();
    let addPath = location.pathname + "/add";
    navigate(addPath, { state: locationState });
  };
  return (
    <div className="storesWrapper">
      <div className="storesTitle">
        {!hideBackButton && (
          <div className="backButtonWrapper" onClick={() => navigate(-1)}>
            <ArrowBack className="backButtonIcon" />
          </div>
        )}
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
            getRowId={(row) => (row.company?.id ? row.company.id : row.id)}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

export default DataTablePageTemplate;
