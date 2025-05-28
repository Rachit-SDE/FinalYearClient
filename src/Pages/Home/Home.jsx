import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import About from '../../Components/About/About'
import Blog from '../../Components/Blogs/Blogs'

const Home = () => {
  return (
    <div>
      <div id="home">
        <Header />
        {/* Your content */}
      </div>
      
      <div id="about">
        <About />
        {/* Your content */}
      </div>

      <div id="blog">
        <Blog />
        {/* Your content */}
      </div>

      <div id="contact">
        <Footer />
        {/* Your content */}
      </div>
    </div>
  )
}

export default Home