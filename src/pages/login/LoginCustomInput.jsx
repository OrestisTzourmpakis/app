import { Person } from "@mui/icons-material";
import "./LoginCustomInput.css";

export default function LoginCustomInput({
  Icon,
  value,
  handleOnChange,
  type,
}) {
  const inputType = type != null ? type : "text";
  return (
    <div className="inputWrapper">
      <div className="inputWrapperIcon">{Icon}</div>
      <input
        type={inputType}
        value={value}
        onChange={(newValue) => handleOnChange(newValue)}
      />
    </div>
  );
}
