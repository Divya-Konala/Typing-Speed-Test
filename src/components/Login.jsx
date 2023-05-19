import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { ErrorMapping } from "../utils/ErrorMapping";
const Login = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!email || !password) {
      toast.warning("please fill all the details", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("user logged in!", {
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
    <Box
      className="login-form"
      p={2}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        type="email"
        variant="outlined"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: { color: theme.textBoxColor },
        }}
        InputProps={{
          style: { color: theme.color },
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: { color: theme.textBoxColor },
        }}
        InputProps={{
          style: { color: theme.color },
        }}
      />
      <Button
        variant="contained"
        style={{ background: theme.textBoxColor, color: theme.color }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
