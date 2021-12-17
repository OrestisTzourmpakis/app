import { Person } from "@mui/icons-material";
import "./LoginCustomInput.css";

export default function LoginCustomInput({ Icon }) {
  return (
    <div className="inputWrapper">
      <div className="inputWrapperIcon">{Icon}</div>
      <input type="text" />
    </div>
  );
}
