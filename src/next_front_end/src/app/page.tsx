'use client'

import { AboutUs } from "@/components/landing/organisms/AboutUsPage"
import { Location } from "@/components/landing/organisms/Contact/Location"
import { ShortFormContact } from "@/components/landing/organisms/Contact/ShortFormContact"
import { DataShow } from "@/components/landing/organisms/DataDisplay/DataDisplay"
import { FlowerPots } from "@/components/landing/organisms/FlowerPots/FlowerPots"
import { Footer } from "@/components/landing/organisms/footer/Footer"
import { FrutalTrees } from "@/components/landing/organisms/FrutalTrees/FrutalTrees"
import { Galleryview } from "@/components/landing/organisms/GalleryView"
import { HomePage } from "@/components/landing/organisms/homePage"
import Navbar from "@/components/landing/organisms/Navbar/Navbar"
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
