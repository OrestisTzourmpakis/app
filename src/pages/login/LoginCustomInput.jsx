import { Box, makeStyles } from "@material-ui/core";
//import "./LoginCustomInput.css";

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    marginBottom: "5px",
    backgroundColor: "lightgray",
    borderRadius: "5px",
    padding: "2px",
    "& input": {
      border: "0",
      padding: "10px",
      fontSize: "20px",
      width: "100%",
      outline: "none !important",
    },
  },
  inputWrapperIcon: {
    padding: "8px",
  },
}));

export default function LoginCustomInput({
  Icon,
  value,
  handleOnChange,
  type,
  placeHolder,
}) {
  const classes = useStyles();
  const inputType = type != null ? type : "text";
  return (
    <>
      <Box display="flex" alignItems="center" className={classes.inputWrapper}>
        <div className={classes.inputWrapperIcon}>{Icon}</div>
        <input
          type={inputType}
          value={value}
          placeholder={placeHolder}
          onChange={(newValue) => handleOnChange(newValue)}
        />
      </Box>
    </>
  );
}
