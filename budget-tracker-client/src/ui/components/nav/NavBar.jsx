import React from 'react'
import Image from 'next/image';
const NavBar = () => {
  return (
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
    
    <Image
      src="../../../../public/budget.png"
      width={1000}
      height={760}
      className="hidden md:block"
      alt="Screenshots of the dashboard project showing desktop version"
    />
    <h2>Budget  Tracker</h2>
  </div>
  )
}

export default NavBar