import { InputAdornment, makeStyles, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    maxWidth: "400px",
  },
}));

function SearchBar({ value, onChange }) {
  const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.searchBar}
        value={value}
        autoFocus={true}
        onChange={(e) => onChange(e.target.value)}
        id="outlined-basic"
        label="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export default SearchBar;
