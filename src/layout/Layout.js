import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import NavigationMenu from "./Navigation";

const Layout = (props) => {
  const [menuCollapse, setMenuCollapse] = useState("false");
  const menuToggle = () => {
    setMenuCollapse(!menuCollapse);
  };

  return (
    <>
      <div className="layout-wrapper">
        <div className="sidebar-wrapper">
          <NavigationMenu menuCollapse={menuCollapse} />
        </div>
        <div
          className={`layout-content-wrapepr ${
            !menuCollapse ? "newClass" : ""
          }`}
        >
          <div className="vald-header-wrapper">
            <Header menuCollapse={menuCollapse} menuToggle={menuToggle} />
          </div>
          <div className="vald-content">{props.children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
