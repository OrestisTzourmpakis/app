import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/userService";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import { FormContext } from "../../contexts/formContext";
import { Button } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";

function Users() {
  const [users, setUsers] = useState([]);
  const data = useContext(FormContext);
  const { changeTab, authed } = useContext(TabContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Ta data");
  console.log(data);
  useEffect(async () => {
    changeTab(tabs.Users);
    try {
      var { data } = await getAllUsers();
      console.log("Users:");
      console.log(data);
      setUsers(data);
    } catch (ex) {
      console.log("Something happend when calling the users api");
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

  const handleViewClick = (row) => {
    navigate(`${location.pathname}/userPoints/${row.id}`, {
      state: {
        email: row.email,
      },
    });
  };

  const columns = [
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return <>{params.row.userName}</>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return params.row.email;
      },
    },
    {
      field: "view",
      headerName: "User Points",
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
    <>
      <DataTablePageTemplate
        title="Users"
        columns={columns}
        row={users}
        hideBackButton={location.pathname === "/users" ? true : false}
      />
    </>
  );
}

export default Users;
