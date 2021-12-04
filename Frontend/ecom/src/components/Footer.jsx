import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='container' >
      {/* <p className="footer-links">
        <a
          href="https://github.com/sivadass/react-shopping-cart"
          target="_blank"
        >
          View Source on Github
        </a>
        <span> / </span>
        <a href="mailto:contact@sivadass.in" target="_blank">
          Need any help?
        </a>
        <span> / </span>
        <a href="https://twitter.com/NSivadass" target="_blank">
          Say Hi on Twitter
        </a>
        <span> / </span>
        <a href="https://sivadass.in" target="_blank">
          Read My Blog
        </a>
      </p> */}
      <a href="/">
      <p>
      <strong> &copy; {currentYear} Kroy - An efficient way to buy</strong>
      </p>
        </a>
    </footer>
  );
};

export default Footer;
