import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  deleteUser,
  getUsersByCompany,
} from "../../services/userService";
import { FormContext } from "../../contexts/formContext";
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
import { Edit, Visibility, DeleteOutline, Add } from "@material-ui/icons";
import { ConfirmationDialogContext } from "../../contexts/confirmationDialogContext";
import { UserContext } from "../../contexts/userContext";
import useTable from "../../components/common/useTable";

function Users() {
  const [users, setUsers] = useState([]);
  const { authed, isAdmin } = useContext(UserContext);
  const [admin, setAdmin] = useState(isAdmin());
  const data = useContext(FormContext);
  const { changeTab } = useContext(TabContext);
  const { openDialog } = useContext(ConfirmationDialogContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [locationState, setLocationState] = useState();
  const usersColumn = [
    // { id: "userName", label: "UserName" },
    { id: "email", label: "Email" },
    { id: "actions", label: "Actions", avoidSearch: true },
  ];
  const {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  } = useTable(users, usersColumn, ["email"]);

  useEffect(() => {
    const Init = async () => {
      if (authed.email === "") return;
      changeTab(tabs.Users);
      try {
        if (isAdmin()) {
          setAdmin(true);
          var { data } = await getAllUsers();
        } else {
          setAdmin(false);
          var { data } = await getUsersByCompany(authed.email);
        }
        setUsers(data);
        setLocationState({ OwnerEmail: authed.email });
      } catch (ex) {}
    };
    Init();
  }, [authed]);

  const handleEditClick = (row) => {
    navigate(`${location.pathname}/${row.id}`, {
      state: {
        ...row,
      },
    });
  };

  const handleDelete = async (email) => {
    let usersInitial = [...users];
    try {
      if (email === null) return;
      let usersTemp = users.filter((c) => c.email !== email);
      setUsers([...usersTemp]);
      // call the api!!
      await deleteUser(email);
    } catch (e) {
      // delete the store here!!!
      setUsers([...usersInitial]);
    }
  };

  const handleViewClick = (row) => {
    navigate(`${location.pathname}/userPoints/${row.id}`, {
      state: {
        email: row.email,
      },
    });
  };

  const handleAssignUser = () => {
    navigate(`../stores/assignUser`, { state: locationState });
  };


  return (
    <>
      <Container>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" className="responsiveTitle">
          <div></div>
          <Typography variant="h3">Χρηστες</Typography>
          
          <Box display="flex">
          {!admin ?
            <Button
              onClick={handleAssignUser}
              color="primary"
              startIcon={<Add />}
              style={{ marginRight: "10px" }}
              variant="contained"
              size="small"
            >
              Αναθεση Χρηστη 
            </Button>
            : <div></div>}
            <Button
            size="small"
            color="primary"
            startIcon={<Add />}
            variant="contained"
            onClick={() => {
              navigate("/users/add");
            }}
          >
            Προσθηκη Χρηστη
          </Button>
        </Box>  
         
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
                      {/* <TableCell>{item.userName}</TableCell> */}
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewClick(item)}
                            startIcon={<Visibility />}
                          >
                            View Points
                          </Button>
                          {admin && (
                            <Box display="flex">
                              <IconButton
                                onClick={() => handleEditClick(item)}
                                color="primary"
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  openDialog({
                                    title: "Delete user?",
                                    body: "Are you sure you want to delete this user?",
                                    yesButton: "Yes",
                                    noButton: "No",
                                    callback: () => handleDelete(item.email),
                                  });
                                }}
                              >
                                <DeleteOutline color="error" />
                              </IconButton>
                            </Box>
                          )}
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

export default Users;
