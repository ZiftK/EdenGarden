import { Divider } from '@raul_yael/cleangui'
import './App.css'
import { AboutUs } from './components/organisms/AboutUsPage'
import { DataShow } from './components/organisms/DataDisplay/DataDisplay'
import { FlowerPots } from './components/organisms/FlowerPots/FlowerPots'
import { FrutalTrees } from './components/organisms/FrutalTrees'
import { Galleryview } from './components/organisms/GalleryView'
import { HomePage } from './components/organisms/homePage'
import { Location } from './components/organisms/Location'
import Navbar from './components/organisms/Navbar'
import { ShortFormContact } from './components/organisms/ShortFormContact'
import { Footer } from './components/organisms/Footer'


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
      <Divider variant='middle'/>
      <Location/>
      <Footer />
      <Navbar />
    </>
  )
}

export default App
