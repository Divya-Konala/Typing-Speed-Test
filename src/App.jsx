import { ThemeProvider } from "styled-components";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from "./styles/global";
import { useTheme } from "./context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import  User from "./pages/User"

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>
    </ThemeProvider>
  );
}

export default App;
