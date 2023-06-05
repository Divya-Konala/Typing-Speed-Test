import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import Login from "./Login";
import Signup from "./Signup";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { ErrorMapping } from "../utils/ErrorMapping";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const provider = new GoogleAuthProvider();

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleClick = () => {
    if (user) navigate("/user");
    else setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("logged out", {
          position: "top-right",
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.success("unable to logout", {
          position: "top-right",
          theme: "dark",
        });
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("google login successful!", {
          position: "top-right",
          theme: "dark",
        });
        handleClose();
      })
      .catch((error) => {
        toast.error(ErrorMapping[error.code] || error.message, {
          position: "top-right",
          theme: "dark",
        });
      });
  };
  return (
    <div className="account">
      <div className="account-icons">
        <AccountCircleRoundedIcon
          style={{ fontSize: "2rem" }}
          onClick={handleClick}
        />
        {user && <LogoutIcon onClick={logout} />}
      </div>
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
              background: theme.background,
              textAlign: "center",
            }}
          >
            <Tabs variant="fullWidth" value={value} onChange={handleChange}>
              <Tab label="login" style={{ color: theme.color }}></Tab>
              <Tab label="signup" style={{ color: theme.color }}></Tab>
            </Tabs>
            {value === 0 ? (
              <Login handleClose={handleClose} />
            ) : (
              <Signup handleClose={handleClose} />
            )}
            <Box style={{ padding: "1rem" }}>
              <span style={{color: theme.color}}>OR</span>
              <GoogleButton
                style={{ width: "100%", marginTop: "1rem" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </AppBar>
        </Box>
      </Modal>
    </div>
  );
};

export default Account;
