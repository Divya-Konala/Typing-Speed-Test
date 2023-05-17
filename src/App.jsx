import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import TypingBox from "./components/typingBox";
import { GlobalStyles } from "./styles/global";
import { useTheme } from "./context/ThemeContext";
import Header from "./components/Header";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header />
        <div className="main">
          <TypingBox />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
