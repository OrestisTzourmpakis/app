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
  Add,
  DeleteOutline,
  Edit,
  Loyalty,
  Visibility,
} from "@material-ui/icons";
import { tabs } from "../../config.json";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTable from "../../components/common/useTable";
import { ConfirmationDialogContext } from "../../contexts/confirmationDialogContext";
import { TabContext } from "../../contexts/tabContext";
import {
  deleteCategory,
  getCategories,
} from "../../services/categoriesService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const { changeTab } = useContext(TabContext);
  const { openDialog } = useContext(ConfirmationDialogContext);
  const navigate = useNavigate();
  const categoriesColumn = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "actions", label: "Actions", avoidSearch: true },
  ];

  useEffect(() => {
    const Init = async () => {
      changeTab(tabs.Categories);
      const { data } = await getCategories();
      setCategories(data);
    };
    Init();
  }, []);

  const handleEditClick = (stateDemo) => {
    navigate(`/categories/${stateDemo.id}`, {
      state: {
        ...stateDemo,
      },
    });
  };

  const handleDelete = async (id) => {
    let categoriesInitial = [...categories];
    try {
      if (id === null) return;
      let categoriesTemp = categories.filter((c) => c.id !== id);
      setCategories([...categoriesTemp]);
      await deleteCategory(id);
    } catch (e) {
      setCategories([...categoriesInitial]);
    }
  };

  const {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  } = useTable(categories, categoriesColumn, ["id", "name"]);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div></div>
        <Typography variant="body1">Categories</Typography>
        <Button
          onClick={() => navigate("/categories/add")}
          color="primary"
          startIcon={<Add />}
          variant="contained"
          size="small"
        >
          Add Category
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
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Box display="flex">
                        <Tooltip title="View Companies">
                          <IconButton
                            onClick={() =>
                              navigate(`/companies?category=${item.id}`)
                            }
                            color="primary"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Category">
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
                                title: "Delete category?",
                                body: "Are you sure you want to delete this category?",
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

export default Categories;
