import KeyboardAltRoundedIcon from "@mui/icons-material/KeyboardAltRounded";
import Account from "./Account";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <KeyboardAltRoundedIcon style={{ fontSize: "2rem" }} />
        swift keys
      </div>
      <Account/>
    </div>
  );
};

export default Header;
