import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useTheme } from "../context/ThemeContext";

const Account = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const {theme} = useTheme();
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div className="account">
      <AccountCircleRoundedIcon
        style={{ fontSize: "2rem" }}
        onClick={() => setOpen(true)}
      />
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box>
          <AppBar
            style={{
              position: "static",
              width: "500px",
              background: "transparent",
            }}
          >
            <Tabs variant="fullWidth" value={value} onChange={handleChange}>
              <Tab label="login" style={{color:theme.color}}></Tab>
              <Tab label="signup" style={{color:theme.color}}></Tab>
            </Tabs>
            {value === 0 ? <Login /> : <Signup />}
          </AppBar>
        </Box>
      </Modal>
    </div>
  );
};

export default Account;
