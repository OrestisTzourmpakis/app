import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/userService";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import { FormContext } from "../../contexts/formContext";

function Users() {
  const [users, setUsers] = useState([]);
  const data = useContext(FormContext);
  const { changeTab, authed } = useContext(TabContext);
  const location = useLocation();
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
  const columns = [
    {
      field: "userName",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Link
            className="storeNameLink"
            to={`${location.pathname}/${params.row.id}`}
            state={{ ...params.row }}
          >
            {params.row.userName}
          </Link>
        );
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
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => {
        return "Company Owner";
      },
    },
    {
      field: "companies",
      headerName: "Show points",
      width: 120,
      renderCell: (params) => {
        return (
          <Link
            className="storeNameLink"
            to={`${location.pathname}/userPoints/${params.row.id}`}
            state={{ email: params.row.email }}
          >
            Show Points
          </Link>
        );
      },
    },
    ,
  ];
  return (
    <>
      <button onClick={data.methods.addMethod}>adfsadfasdfasd</button>
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
