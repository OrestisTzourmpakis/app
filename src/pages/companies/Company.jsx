import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link, useNavigate } from "react-router-dom";
import DataTablePageTemplate from "../../components/common/dataTablePageTemplate";
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
import { red } from "@material-ui/core/colors";
import { ConfirmationDialogContext } from "../../contexts/confirmationDialogContext";
import useTable from "../../components/common/useTable";
import { UserContext } from "../../contexts/userContext";

function Company() {
  const [companies, setCompanies] = useState([]);
  const { changeTab } = useContext(TabContext);
  const { openDialog } = useContext(ConfirmationDialogContext);
  const { changeCompanyOnwer } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleDelete = async (id) => {
    let companiesInitial = [...companies];
    try {
      if (id === null) return;
      let companiesTemp = companies.filter((c) => c.id !== id);
      console.log("companies temp:");
      console.log(companiesTemp);
      setCompanies([...companiesTemp]);
      // call the api!!
      await deleteCompany(id);
    } catch (e) {
      // delete the store here!!!
      setCompanies([...companiesInitial]);
      console.log("Error in the handleDelete");
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
    console.log("To row", row);
    console.log("Email", row.ownerEmail);
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

        {/* <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton> */}
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
          </TableBody>
        </TableContainer>
        <TablePaginationCustom />
      </Box>
    </Container>
    // <DataTablePageTemplate
    //   title="Companies"
    //   columns={columns}
    //   row={companies}
    //   hideBackButton={location.pathname === "/companies" ? true : false}
    // />
  );
}

export default Company;
