import './App.css'
import { AboutUs } from './components/organisms/AboutUsPage'
import { DataShow } from './components/organisms/DataDisplay'
import { FlowerPots } from './components/organisms/FlowerPots'
import { FrutalTrees } from './components/organisms/FrutalTrees'
import { Galleryview } from './components/organisms/GalleryView'
import { HomePage } from './components/organisms/homePage'
import Navbar from './components/organisms/Navbar'


function App() {
  return (
    <>
      <HomePage />
      <Navbar />
      <AboutUs/>
      <DataShow />
      <Galleryview />
      <FlowerPots />
      <FrutalTrees />
    </>
  )
}

export default App
