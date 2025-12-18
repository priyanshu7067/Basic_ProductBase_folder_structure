import React from 'react'
import Checkout from './Checkout'
import NavBar from './NavBar'
import Footer from './Footer'

const CheckoutPage = () => {
    return (
        <div>
            <div className="p-1 px-3  flex flex-col gap-4">
                <NavBar />
                <div className="px-3">
                    <Checkout />
                    {/* <Testimonials /> */}
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage