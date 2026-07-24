import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '@/Components/Hero'
import About from '@/Components/About'
import Leadership from '@/Components/Leadership'
import MentorMessage from '@/Components/Mentor'
import OurEvents from '@/Components/Events'
import SupportSection from '@/Components/SupportSection'
import Footer from '@/Components/Footer'

const page = () => {
  return (
    <>
<div className="min-h-screen bg-[#030712] text-white">
  <Navbar />
  <Hero />
  <About/>
  <Leadership/>
  <MentorMessage/>
  <OurEvents/>
  <SupportSection/>
  <Footer/>
</div>
    </>
  )
}

export default page