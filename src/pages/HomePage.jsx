import Footer from "../components/Footer"
import Header from "../components/Header"
import TypingBox from "../components/typingBox"


const HomePage = () => {
  return (
    <div className='canvas'>
        <Header />
        <div className="main">
          <TypingBox />
        </div>
        <Footer />
    </div>
  )
}

export default HomePage