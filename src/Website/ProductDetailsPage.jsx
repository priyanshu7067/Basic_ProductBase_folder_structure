import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import ProductDetails from './ProductDetails';

const ProductDetailsPage = () => {
    return (
        <div className="p-1 px-3  flex flex-col gap-4">
            <NavBar />
            <div className="px-3 mt-14">
                <ProductDetails />
                {/* <Testimonials /> */}
                <Footer />
            </div>
        </div>
    );
}

export default ProductDetailsPage