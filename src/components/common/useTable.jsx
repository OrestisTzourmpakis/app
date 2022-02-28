import {
  Box,
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import _ from "lodash";
import { useEffect } from "react";
import SearchBar from "./searchBar";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "800px",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "auto",
    },
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      cursor: "pointer",
    },
  },
}));

export default function useTable(records, headCells, searchKeys) {
  const classes = useStyles();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  let [filteredRecords, setFilteredRecords] = useState(records);
  console.log("Ta filtered Records:", filteredRecords);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  // order is asc or desc
  const [order, setOrder] = useState();
  // orderby einai to id tou cell sto opoio exw pathsei
  const [orderBy, setOrderBy] = useState();

  useEffect(() => {
    setFilteredRecords(records === null ? [] : records);
    console.log("Ta records:", records);
  }, [records]);

  useEffect(() => {
    const newFilter = records.filter((record) => {
      //console.log(record);
      let satisfied = false;
      searchKeys.forEach((item) => {
        if (item.avoidSearch) return;
        var showKey = _.get(record, item);
        console.log(showKey);
        var result = String(_.get(record, item))
          .toLowerCase()
          .includes(search.toLowerCase());
        //console.log("To result", result);
        if (result) {
          satisfied = true;
          return true;
        }
      });
      if (satisfied) return true;
      return false;
    });
    setFilteredRecords(newFilter);
    // console.log(search);
  }, [search]);

  const TableContainer = (props) => (
    <Box display="flex" flexDirection="column" key="boxWrapper">
      <SearchBar value={search} onChange={setSearch} />
      <Table key="table" className={classes.table}>
        {props.children}
      </Table>
    </Box>
  );

  const TableHeader = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => {
                  handleSortRequest(headCell.id);
                }}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TablePaginationCustom = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={filteredRecords.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  function stableSort(array) {
    return _.orderBy(array, [orderBy], [order]);
  }

  const recordsAfterPaging = () => {
    return stableSort(filteredRecords).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  };
}
