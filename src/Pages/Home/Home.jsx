import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import About from '../../Components/About/About'
import Blog from '../../Components/Blogs/Blogs'

const Home = () => {
  return (
    <div>
        <Header/>
        <About/>
        <Blog/>
        <Footer/>
    </div>
  )
}

export default Home