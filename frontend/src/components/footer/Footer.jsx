import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";
import { Phone } from "@mui/icons-material";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                   Thank you for visiting All in One Solutions for our College <br></br>. We take pride in serving you the finest quality services with love.

Stay connected with us on social media for updates on our latest offerings and special promotions:
                </div>
                <div className="socialIcons">
                    {/* <span className="icon">
                        <FaFacebookF />
                    </span> */}
                    <a href="https://instagram.com/" className="icon">
                    <span >
                        <FaInstagram />
                    </span>
                    </a>
                     <a href="tel:+917017059197" className="icon">
                    <span className="icon">
                        <Phone/>
                    </span>
                    </a>
                    {/* <span className="icon">
                        <FaLinkedin />
                    </span> */}
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;