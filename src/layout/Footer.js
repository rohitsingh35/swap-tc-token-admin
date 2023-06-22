import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <span className="text-center">
        Copyright © 2022{" "}
        <Link to="/" className="text-muted" target="_blank">
          Vlad
        </Link>
        . All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
