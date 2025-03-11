import './App.css'
import { AboutUs } from './components/organisms/aboutUsPage'
import { HomePage } from './components/organisms/homePage'
import Navbar from './components/organisms/Navbar'


function App() {
  return (
    <>
      <HomePage />
      <Navbar />
      <AboutUs/>
    </>
  )
}

export default App
