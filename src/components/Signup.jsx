import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme } = useTheme();

  return (
    <Box
      className="signup-form"
      p={2}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        type="email"
        variant="outlined"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          style: { color: theme.color },
        }}
        sx={{
          "& label.Mui-focused": {
            color: theme.color,
          },
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          style: { color: theme.color },
        }}
        sx={{
          "& label.Mui-focused": {
            color: theme.color,
          },
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Enter Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          style: { color: theme.color },
        }}
        sx={{
          "& label.Mui-focused": {
            color: theme.color,
          },
        }}
      />
      <Button variant="contained" style={{ background: theme.textBoxColor }}>
        Signup
      </Button>
    </Box>
  );
};

export default Signup;
