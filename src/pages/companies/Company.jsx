import React, { useContext, useEffect, useState } from "react";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, deleteCompany } from "../../services/companyService";
import {
  Box,
  Button,
  Container,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Edit,
  Visibility,
  DeleteOutline,
  Add,
  Loyalty,
} from "@material-ui/icons";
import { ConfirmationDialogContext } from "../../contexts/confirmationDialogContext";
import useTable from "../../components/common/useTable";
import { UserContext } from "../../contexts/userContext";

function Company() {
  const [companies, setCompanies] = useState([]);
  const { changeTab } = useContext(TabContext);
  const { openDialog } = useContext(ConfirmationDialogContext);
  const { changeCompanyOnwer } = useContext(UserContext);
  const navigate = useNavigate();
  const companiesColumn = [
    { id: "name", label: "Name" },
    { id: "ownerEmail", label: "Owner" },
    { id: "actions", label: "Actions", avoidSearch: true },
  ];
  const {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  } = useTable(companies, companiesColumn, ["name", "ownerEmail"]);

  useEffect(async () => {
    changeTab(tabs.Companies);
    const { data } = await getAllCompanies();
    setCompanies(data);
  }, []);

  const handleEditClick = (stateDemo) => {
    navigate(`/companies/${stateDemo.id}`, {
      state: {
        euroToPoints: stateDemo.euroToPointsRatio,
        pointsToEuro: stateDemo.pointsToEuroRatio,
        ...stateDemo,
      },
    });
  };

  const handleDelete = async (id) => {
    let companiesInitial = [...companies];
    try {
      if (id === null) return;
      let companiesTemp = companies.filter((c) => c.id !== id);
      setCompanies([...companiesTemp]);
      await deleteCompany(id);
    } catch (e) {
      setCompanies([...companiesInitial]);
    }
  };

  const handleViewClick = (row) => {
    changeCompanyOnwer(row.ownerEmail);
    navigate(`/companies/${row.id}/stores`, {
      state: {
        id: row.id,
      },
    });
  };

  const handleViewSales = (row) => {
    changeCompanyOnwer(row.ownerEmail);
    navigate("/companies/sales", {
      state: {
        id: row.id,
      },
    });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div></div>
        <Typography variant="body1">Companies</Typography>
        <Button
          onClick={() => navigate("/companies/add")}
          color="primary"
          startIcon={<Add />}
          variant="contained"
          size="small"
        >
          Add Company
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
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.ownerEmail ? item.ownerEmail : "Not found"}
                    </TableCell>
                    <TableCell>
                      <Box display="flex">
                        <Tooltip title="View Stores">
                          <IconButton
                            onClick={() => handleViewClick(item)}
                            color="primary"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View Sales">
                          <IconButton
                            onClick={() => handleViewSales(item)}
                            color="primary"
                          >
                            <Loyalty />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Company">
                          <IconButton
                            onClick={() => handleEditClick(item)}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Company">
                          <IconButton
                            onClick={() => {
                              openDialog({
                                title: "Delete company?",
                                body: "Are you sure you want to delete this company?",
                                yesButton: "Yes",
                                noButton: "No",
                                callback: () => handleDelete(item.id),
                              });
                            }}
                          >
                            <DeleteOutline color="error" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </TableContainer>
        <TablePaginationCustom />
      </Box>
    </Container>
  );
}

export default Company;
