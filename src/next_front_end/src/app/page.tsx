'use client'

import { AboutUs } from "@src/components/landing/organisms/AboutUsPage"
import { Location } from "@src/components/landing/organisms/Contact/Location"
import { ShortFormContact } from "@src/components/landing/organisms/Contact/ShortFormContact"
import { DataShow } from "@src/components/landing/organisms/DataDisplay/DataDisplay"
import { FlowerPots } from "@src/components/landing/organisms/FlowerPots/FlowerPots"
import { Footer } from "@src/components/landing/organisms/footer/Footer"
import { FrutalTrees } from "@src/components/landing/organisms/FrutalTrees/FrutalTrees"
import { Galleryview } from "@src/components/landing/organisms/GalleryView"
import { HomePage } from "@src/components/landing/organisms/homePage"
import Navbar from "@src/components/landing/organisms/Navbar/Navbar"
import { Divider } from "@raul_yael/cleangui"


export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
      <HomePage />
      <AboutUs />
      <DataShow />
      <Galleryview />
      <FlowerPots />
      <FrutalTrees />
      <ShortFormContact />
      <Divider variant="middle"/>
      <Location /> 
      </main>
      <Footer />
      <Navbar />
    </>
  );
}
