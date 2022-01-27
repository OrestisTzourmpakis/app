import React, { useContext } from "react";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useLocation } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
import {
  getSaleById,
  getAllSales,
  addSale,
  updateSale,
} from "../../services/salesService";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
function Sales() {
  const [sales, setSales] = useState([]);
  const { authed } = useContext(UserContext);
  const userEmail = authed.email;
  const location = useLocation();
  useEffect(async () => {
    // get the company id from the
    // get the context!!

    const { data } = await getSaleById(userEmail);
    setSales(data);
  }, []);

  const handleAdd = async (neew) => {
    await addSale(neew);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => {
        return <div>{params.row.id}</div>;
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 90,
      renderCell: (params) => {
        return <div>{params.row.title}</div>;
      },
    },
    {
      field: "dateStart",
      headerName: "Date Start",
      width: 90,
      renderCell: (params) => {
        return <div>{params.row.dateStart}</div>;
      },
    },
    {
      field: "dateEnd",
      headerName: "Date End",
      width: 90,
      renderCell: (params) => {
        return <div>{params.row.dateEnd}</div>;
      },
    },
    {
      field: "viewSales",
      headerName: "View",
      width: 120,
      renderCell: (params) => {
        return (
          <Link
            to={`/sales/${params.id}`}
            state={{
              ...params.row,
            }}
          >
            View
          </Link>
        );
      },
    },
    {
      field: "updateSales",
      headerName: "Update",
      width: 120,
      renderCell: (params) => {
        return (
          <Link
            to={`${location.pathname}/updateSale`}
            state={{ ...params.row }}
          >
            Update
          </Link>
        );
      },
    },
  ];
  return (
    <DataTablePageTemplate
      title="Sales"
      row={sales}
      columns={columns}
      locationState={{ Email: userEmail }}
    />
  );
}

export default Sales;
