import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import TypingBox from "./components/typingBox";
import { GlobalStyles } from "./styles/global";
import { useTheme } from "./context/ThemeContext";

function App() {
  const {theme}=useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <div className="header">Header</div>
        <div className="main">
          <TypingBox />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
