import React, { useContext } from "react";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getSaleById,
  getAllSales,
  addSale,
  updateSale,
  deleteSale,
} from "../../services/salesService";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  Box,
  Button,
  Container,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Edit, DeleteOutline, ArrowBack, Add } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { ConfirmationDialogContext } from "../../contexts/confirmationDialogContext";
import useTable from "../../components/common/useTable";
import { dateConfiguration } from "../../utilities/dataConfiguration";

function Sales() {
  const [sales, setSales] = useState([]);
  const { authed, isAdmin, companyOwnerEmail } = useContext(UserContext);
  const [admin, setAdmin] = useState(isAdmin());
  const { openDialog } = useContext(ConfirmationDialogContext);
  const location = useLocation();
  const userEmail = isAdmin() ? companyOwnerEmail : authed.email;
  const navigate = useNavigate();
  const salesColumn = [
    { id: "title", label: "Title" },
    { id: "dateStart", label: "Date Start" },
    { id: "dateEnd", label: "Date End" },
    { id: "actions", label: "Action", avoidSearch: true },
  ];
  const {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  } = useTable(sales, salesColumn, ["title", "dateStart", "dateEnd"]);
  useEffect(() => {
    const Init = async () => {
      const { data } = await getSaleById(userEmail);
      setSales(data);
    };
    Init();
  }, [authed, companyOwnerEmail]);

  useEffect(() => {
    setAdmin(isAdmin());
  }, [authed]);

  const handleAddSale = (e) => {
    e.preventDefault();
    let addPath = location.pathname + "/add";
    navigate(addPath);
  };

  const handleAdd = async (neew) => {
    await addSale(neew);
  };

  const handleOnDelete = (params) => {
    openDialog({
      title: "Delete sale?",
      body: "Are you sure you want to delete this sale?",
      yesButton: "Yes",
      noButton: "No",
      callback: () => handleDelete(params.row.id),
    });
  };

  const handleDelete = async (id) => {
    let salesInitial = [...sales];
    try {
      if (id === null) return;
      let salesTemp = sales.filter((c) => c.id !== id);
      setSales([...salesTemp]);
      // call the api!!
      await deleteSale(id);
    } catch (e) {
      // delete the store here!!!
      setSales([...salesInitial]);
    }
  };

  const handleEditClick = (row) => {
    navigate(`/sales/${row.id}`, {
      state: {
        ...row,
      },
    });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {admin ? (
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        ) : (
          <div></div>
        )}

        {/* <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton> */}
        <Typography variant="body1">Sales</Typography>
        <Button
          onClick={handleAddSale}
          color="primary"
          startIcon={<Add />}
          variant="contained"
          size="small"
        >
          Add Sale
        </Button>
      </Box>
      <Box
        style={{ marginTop: "20px" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <TableContainer key="tableContainer">
          <TableHeader />
          <TableBody>
            {recordsAfterPaging()?.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <b>No Results</b>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {recordsAfterPaging().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{dateConfiguration(item.dateStart)}</TableCell>
                    <TableCell>{dateConfiguration(item.dateEnd)}</TableCell>
                    <TableCell>
                      <Box display="flex">
                        <IconButton
                          onClick={() => handleEditClick(item)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton onClick={handleOnDelete}>
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}

            {/* */}
          </TableBody>
        </TableContainer>
        <TablePaginationCustom />
      </Box>
    </Container>
  );
}

export default Sales;
