import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useNavigate } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import { getAllCompanies } from "../../services/companyService";

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
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Link
            className="storeNameLink"
            to={`/companies/${params.row.id}/stores`}
            state={{ id: params.row.id }}
          >
            {params.row.name}
          </Link>
        );
      },
    },
    {
      field: "logo",
      headerName: "Logo",
      width: 120,
    },
    {
      field: "website",
      headerName: "Website",
      width: 120,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <h2 onClick={() => handleEditClick(params.row)}>Edit this boy</h2>
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
