import React from 'react'
import notFound from '../../assets/notFound.jpg'
import Footer from '../Feed/Footer'

function NotFound() {
  return (
    <div className='not'>
        <img src= { notFound } className="notFound" alt="notFound"/>

        <Footer></Footer>
    </div>
  )
}

export default NotFound