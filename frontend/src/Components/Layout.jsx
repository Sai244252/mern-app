import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 bg-gray-100 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
