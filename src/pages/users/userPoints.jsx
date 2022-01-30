import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import { getUserPointsAllCompanies } from "../../services/pointsService";
import { Button } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";

function UserPoints() {
  const [userPoints, setUserPoints] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(async () => {
    // call the api to get the user's points!!
    try {
      var { data } = await getUserPointsAllCompanies(location.state.email);
      console.log("Userpoints data:");
      console.log(data);
      setUserPoints(data);
    } catch (ex) {
      console.log("Error getting the user points by email!");
    }
  }, []);

  const handleViewCompany = (row) => {
    navigate(`${location.pathname}/${row.company.name}`, {
      state: {
        ...row,
      },
    });
  };

  const handleAddRemovePoints = (row) => {
    navigate(`${location.pathname}/setPoints`, {
      state: {
        companyId: row.company.id,
        userId: row.applicationUserId,
        euroToPointsRatio: row.company.euroToPointsRatio,
      },
    });
  };

  const handleRedeemPoints = (row) => {
    navigate(`${location.pathname}/redeemPoints`, {
      state: {
        companyId: row.company.id,
        userId: row.applicationUserId,
        pointsToEuroRatio: row.company.pointsToEuroRatio,
        points: row.total,
      },
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => {
        return <div>{params.row.company.id}</div>;
      },
    },
    {
      field: "name",
      headerName: "Company Name",
      width: 200,
      renderCell: (params) => {
        return <>{params.row.company.name}</>;
      },
    },
    {
      field: "total",
      headerName: "Points",
      width: 120,
    },
    {
      field: "viewCompany",
      headerName: "Company",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Button
              color="primary"
              onClick={() => handleViewCompany(params.row)}
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
      field: "pointsField",
      headerName: "Set Points",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Button
              color="primary"
              onClick={() => handleAddRemovePoints(params.row)}
              variant="contained"
              startIcon={<Visibility />}
            >
              Add/Remove
            </Button>
          </>
        );
      },
    },
    {
      field: "redeeom",
      headerName: "Redeem Points",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Button
              color="primary"
              onClick={() => handleRedeemPoints(params.row)}
              variant="contained"
              startIcon={<Visibility />}
            >
              View
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <DataTablePageTemplate
      title="Orestis's points"
      columns={columns}
      row={userPoints}
      hideAddButton={true}
    />
  );
}

export default UserPoints;
