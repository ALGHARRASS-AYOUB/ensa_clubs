import React from 'react'
import Actuality from '../components/actualities/Actuality'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from './About'
import Contact from './Contact'

const Home = () => {
  return (
    <>
    <Hero/>
    <Actuality/>
    <About/>
    <Contact/>
    <Footer/>
    </>

  )
}

export default Home