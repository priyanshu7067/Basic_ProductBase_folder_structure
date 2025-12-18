import React from 'react'
import Cart from './Cart'
import NavBar from './NavBar'
import Footer from './Footer'

const CartPage = () => {
  return (
    <div>
        <div className="p-3 flex flex-col gap-4 ">
            <NavBar/>
            <Cart />
            {/* <Testimonials/> */}
            <Footer/>
        </div>
    </div>
  )
}

export default CartPage