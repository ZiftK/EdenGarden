import './App.css'
import { AboutUs } from './components/organisms/AboutUsPage'
import { DataShow } from './components/organisms/DataDisplay'
import { FlowerPots } from './components/organisms/FlowerPots'
import { FrutalTrees } from './components/organisms/FrutalTrees'
import { Galleryview } from './components/organisms/GalleryView'
import { HomePage } from './components/organisms/homePage'
import Navbar from './components/organisms/Navbar'
import { ShortFormContact } from './components/organisms/ShortFormContact'


function App() {
  return (
    <>
      <HomePage />
      <AboutUs/>
      <DataShow />
      <Galleryview />
      <FlowerPots />
      <FrutalTrees />
      <ShortFormContact />
      <Navbar />
    </>
  )
}

export default App
