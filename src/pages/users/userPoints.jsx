import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUserPointsAllCompanies,
  getUserPointsPerCompany,
} from "../../services/pointsService";
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
import { Add, AttachMoney, ArrowBack } from "@material-ui/icons";
import useTable from "../../components/common/useTable";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

function UserPoints() {
  const [userPoints, setUserPoints] = useState([]);
  const { authed, isAdmin } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userPointsColumns = [
    { id: "name", label: "Company Name" },
    { id: "total", label: "Points" },
    { id: "actions", label: "Actions" },
  ];
  const {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  } = useTable(userPoints, userPointsColumns, ["company.name", "total"]);
  useEffect(async () => {
    // call the api to get the user's points!!
    try {
      if (isAdmin())
        var { data } = await getUserPointsAllCompanies(location.state.email);
      else
        var { data } = await getUserPointsPerCompany(
          location.state.email,
          authed.email
        );
      setUserPoints(data);
    } catch (ex) {}
  }, []);

  const handleViewCompany = (row) => {
    navigate(`${location.pathname}/${row.company.name}`, {
      state: {
        ...row,
      },
    });
  };

  const handleAddRemovePoints = (row) => {
    navigate(`${location.pathname}/setPoints`, {
      state: {
        companyId: row.company.id,
        userId: row.applicationUserId,
        euroToPointsRatio: row.company.euroToPointsRatio,
      },
    });
  };

  const handleRedeemPoints = (row) => {
    navigate(`${location.pathname}/redeemPoints`, {
      state: {
        companyId: row.company.id,
        userId: row.applicationUserId,
        pointsToEuroRatio: row.company.pointsToEuroRatio,
        points: row.total,
      },
    });
  };

  return (
    <>
      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="body1">User points</Typography>
          <div></div>
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
                      <TableCell>{item.company.name}</TableCell>
                      <TableCell>{item.total}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddRemovePoints(item)}
                            startIcon={<Add />}
                          >
                            Add Points
                          </Button>

                          <Box display="flex">
                            <Button
                              onClick={() => handleRedeemPoints(item)}
                              color="primary"
                              startIcon={<Add />}
                            >
                              Redeem
                            </Button>
                          </Box>
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
    </>
  );
}

export default UserPoints;
