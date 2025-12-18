import React from "react";
import Footer from "../Website/Footer";
import NavBar from "../Website/NavBar";

const MainLayout = ({ inner }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar  />

      <main className="flex-grow">{inner}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
