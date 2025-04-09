'use client'

import { AboutUs } from "@/_components/organisms/AboutUsPage"
import { Location } from "@/_components/organisms/Contact/Location"
import { ShortFormContact } from "@/_components/organisms/Contact/ShortFormContact"
import { DataShow } from "@/_components/organisms/DataDisplay/DataDisplay"
import { FlowerPots } from "@/_components/organisms/FlowerPots/FlowerPots"
import { Footer } from "@/_components/organisms/footer/Footer"
import { FrutalTrees } from "@/_components/organisms/FrutalTrees/FrutalTrees"
import { Galleryview } from "@/_components/organisms/GalleryView"
import { HomePage } from "@/_components/organisms/homePage"
import Navbar from "@/_components/organisms/Navbar/Navbar"
import { Divider } from "@raul_yael/cleangui"


export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
      <HomePage />
      <AboutUs />
      <DataShow />
      <Galleryview />
      {/*<FlowerPots />
      <FrutalTrees />
      <ShortFormContact />
      <Divider variant="middle"/>
      <Location /> */}
      </main>
      {/* <Footer /> */}
      <Navbar />
    </>
  );
}
