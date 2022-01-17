import React from "react";
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
function Sales() {
  const [sales, setSales] = useState([]);
  const location = useLocation();
  useEffect(async () => {
    // get the company id from the
    const { data } = await getSaleById(1);
    setSales(data);
  }, []);

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
            to={`${location.pathname}/viewSale`}
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
            state={{ ...params.row, data: addSale }}
          >
            Update
          </Link>
        );
      },
    },
  ];
  return <DataTablePageTemplate title="Sales" row={sales} columns={columns} />;
}

export default Sales;
