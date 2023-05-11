import TypingBox from "./components/typingBox"
import { GlobalStyles } from "./styles/global"


function App() {
  return <div className='App'>
    <GlobalStyles/>
    <div className="header">Header</div>
    <div className="main">
      <TypingBox/>
    </div>
    <div className="footer">Footer</div>
  </div>
}

export default App
