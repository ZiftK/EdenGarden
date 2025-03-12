import './App.css'
import { AboutUs } from './components/organisms/AboutUsPage'
import { DataShow } from './components/organisms/DataDisplay'
import { HomePage } from './components/organisms/HomePage'
import Navbar from './components/organisms/Navbar'


function App() {
  return (
    <>
      <HomePage />
      <Navbar />
      <AboutUs/>
      <DataShow />
    </>
  )
}

export default App
