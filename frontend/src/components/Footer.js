import React from 'react'

const Footer = () => {
    const date = new Date();
  return (
    <div className='container-fluid bg-dark py-3 px-4 text-white text-center'>Copyright Suraj © {date.getFullYear()} </div>
  )
}

export default Footer