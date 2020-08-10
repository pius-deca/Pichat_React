import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div className="black mt-5">
      <div className="text-center white-text py-5 px-2">  
        <p>© 2020 Aremieye Ebimobowei Pius. All Right Reserved.</p>
        <div className="footer-links">
          <Link to="/" className="pr-3 white-text link">Terms and Conditions</Link>
          <Link to="/" className="pr-3 white-text link">Privacy Policy</Link>
          <Link to="/contact" className="pr-3 white-text link">Contact Us</Link>
          <Link to="/about" className="white-text link">About</Link>
        </div>
      </div>   
    </div>
  )
}
