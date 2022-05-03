import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
      <footer>
          <div className="footer-elem">
              <a href="https://www.instagram.com/autoecolebastos2.0/" target="_blank"><i className="fa-brands fa-instagram-square"></i></a>         
          </div>
          <div className="footer-elem">
              <a href="https://www.facebook.com/autoecolebastos2.0" target=""><i className="fa-brands fa-facebook"></i></a> 
          </div>
          <div className="footer-elem">
              <i className="fa-brands fa-twitter"></i>
          </div>
          <div className="footer-elem">
              <i className="fa-brands fa-snapchat-square"></i>
          </div>
      </footer>
  )
}

export default Footer