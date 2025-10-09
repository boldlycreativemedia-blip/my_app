'use client'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AboutAnimatedContent from '../components/AboutAnimatedContent'
import AboutSecondSection from '../components/AboutSecondSection'
import AnimatedStatsWithDividers from '../components/AnimatedStatsCounter'
import Testimonials from '../components/Testimonials'
import AboutOurTeam from '../components/AboutOurTeam'
import LastAboutSection from '../components/LastAboutSection'

const page = () => {
  return (
    <div>
      <Header/>
      <AboutAnimatedContent/>
      <AboutSecondSection />
      <AnimatedStatsWithDividers />
      <Testimonials />
      <AboutOurTeam />
      <LastAboutSection />
      <Footer/>
    </div>
  )
}

export default page

