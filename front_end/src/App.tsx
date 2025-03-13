import './App.css'
import { AboutUs } from './components/organisms/AboutUsPage'
import { DataShow } from './components/organisms/DataDisplay'
import { FlowerPots } from './components/organisms/FlowerPots'
import { Galleryview } from './components/organisms/GalleryView'
import { HomePage } from './components/organisms/HomePage'
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
    </>
  )
}

export default App
