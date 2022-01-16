import "./TopbarSection.css";
import { Link } from "react-router-dom";

export default function TopbarSection({ hide, handleClick }) {
  return (
    <div className={`topbarSectionWrapper ${hide ? "hideTopbarSection" : ""}`}>
      <ul className="topbarSectionList">
        <li>
          <Link to="/profile">
            <div className="profile">Profile</div>
          </Link>
        </li>
        <li>
          <Link to="/Logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}
