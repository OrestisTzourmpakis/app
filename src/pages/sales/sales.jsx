import React, { useContext } from "react";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Button } from "@mui/material";
import { Edit, Visibility, Delete } from "@mui/icons-material";

function Sales() {
  const [sales, setSales] = useState([]);
  const { authed } = useContext(UserContext);
  const userEmail = authed.email;
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(async () => {
    // get the company id from the
    // get the context!!

    const { data } = await getSaleById(userEmail);
    setSales(data);
  }, []);

  const handleAdd = async (neew) => {
    await addSale(neew);
  };

  const handleEditClick = (row) => {
    console.log("Clicked here boy");
    navigate(`/sales/${row.id}`, {
      state: {
        ...row,
      },
    });
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
      width: 110,
      renderCell: (params) => {
        return <div>{params.row.dateStart}</div>;
      },
    },
    {
      field: "dateEnd",
      headerName: "Date End",
      width: 110,
      renderCell: (params) => {
        return <div>{params.row.dateEnd}</div>;
      },
    },
    {
      field: "edit",
      headerName: "View / Edit",
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
    {
      field: "delete",
      headerName: "Delete",
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
      title="Sales"
      row={sales}
      columns={columns}
      locationState={{ email: userEmail }}
    />
  );
}

export default Sales;
