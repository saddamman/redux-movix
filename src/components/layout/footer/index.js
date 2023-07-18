import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </span>
          <span className="icon">
            <FontAwesomeIcon icon={faInstagram} />
          </span>
          <span className="icon">
            <FontAwesomeIcon icon={faTwitter} />
          </span>
          <span className="icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
