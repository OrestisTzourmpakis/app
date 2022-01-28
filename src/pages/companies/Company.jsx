import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useNavigate } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import { getAllCompanies } from "../../services/companyService";
import { Button } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";

function Company() {
  const [companies, setCompanies] = useState([]);
  const { changeTab } = useContext(TabContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(async () => {
    changeTab(tabs.Companies);
    const { data } = await getAllCompanies();
    console.log("Ta companies!!!!!");
    console.log(data);
    setCompanies(data);
  }, []);
  const handleEditClick = (stateDemo) => {
    console.log("Clicked here boy");
    navigate(`/companies/${stateDemo.id}`, {
      state: {
        euroToPoints: stateDemo.euroToPointsRatio,
        pointsToEuro: stateDemo.pointsToEuroRatio,
        ...stateDemo,
      },
    });
  };

  const handleViewClick = (row) => {
    navigate(`/companies/${row.id}/stores`, {
      state: {
        id: row.id,
      },
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return <>{params.row.name}</>;
      },
    },
    {
      field: "website",
      headerName: "Website",
      width: 120,
    },
    {
      field: "view",
      headerName: "Stores",
      renderCell: (params) => {
        return (
          <>
            <Button
              color="primary"
              onClick={() => handleViewClick(params.row)}
              variant="contained"
              startIcon={<Visibility />}
            >
              View
            </Button>
          </>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
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
      title="Companies"
      columns={columns}
      row={companies}
      hideBackButton={location.pathname === "/companies" ? true : false}
    />
  );
}

export default Company;
