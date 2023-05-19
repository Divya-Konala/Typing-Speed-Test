import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { ErrorMapping } from "../utils/ErrorMapping";

const Signup = ({handleClose}) => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("please fill all the details", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("password - confirm password mismatch", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("user created!", {
          position: "top-right",
          theme: "dark",
        });
        handleClose();
        return updateProfile(userCredential.user, {displayName: name});
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
      className="signup-form"
      p={2}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        type="text"
        variant="outlined"
        label="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputLabelProps={{
          style: { color: theme.textBoxColor },
        }}
        InputProps={{
          style: { color: theme.color },
        }}
      />
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
      <TextField
        type="password"
        variant="outlined"
        label="Enter Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        Signup
      </Button>
    </Box>
  );
};

export default Signup;
