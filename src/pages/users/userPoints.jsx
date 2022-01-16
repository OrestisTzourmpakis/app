import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import { getUserPointsAllCompanies } from "../../services/pointsService";

function UserPoints() {
  const [userPoints, setUserPoints] = useState([]);
  const location = useLocation();

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
        return (
          <Link
            className="storeNameLink"
            to={`/users/${params.row.company.name}`}
            state={{ ...params.row }}
          >
            {params.row.company.name}
          </Link>
        );
      },
    },
    {
      field: "total",
      headerName: "Points",
      width: 120,
    },
    {
      field: "setPoints",
      headerName: "Edit Points",
      width: 120,
      renderCell: (params) => {
        return (
          <Link
            className="storeNameLink"
            to={`${location.pathname}/${params.row.company.name}`}
            state={{ ...params.row }}
          >
            Set Points
          </Link>
        );
      },
    },
    {
      field: "pointsField",
      headerName: "Set Points",
      width: 120,
      renderCell: (params) => {
        return (
          <Link
            to={`${location.pathname}/setPoints`}
            state={{
              companyId: params.row.company.id,
              userId: params.row.applicationUserId,
              euroToPointsRatio: params.row.company.euroToPointsRatio,
            }}
          >
            Add/Remove
          </Link>
        );
      },
    },
    {
      field: "redeeom",
      headerName: "Redeem Points",
      width: 120,
      renderCell: (params) => {
        return (
          <Link
            to={`${location.pathname}/redeemPoints`}
            state={{
              companyId: params.row.company.id,
              userId: params.row.applicationUserId,
              pointsToEuroRatio: params.row.company.pointsToEuroRatio,
              points: params.row.total,
            }}
          >
            Redeem
          </Link>
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
