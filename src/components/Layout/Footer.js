import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mt-5">
      <div className="text-center black-text font-weight-bold py-5 px-2">
        <p>© 2020 Aremieye Ebimobowei Pius. All Right Reserved.</p>
        <div className="footer-links">
          <Link to="/" className="pr-3 black-text font-weight-bold link">
            Terms and Conditions
          </Link>
          <Link to="/" className="pr-3 black-text font-weight-bold link">
            Privacy Policy
          </Link>
          <Link to="/contact" className="pr-3 black-text font-weight-bold link">
            Contact Us
          </Link>
          <Link to="/about" className="black-text font-weight-bold link">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
