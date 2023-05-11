import React from 'react'

export default function Footer() {
  return (
    <div>
       <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-3 col-sm-6">
        <div className="footer-about-us">
        <img src="../../../assets/images/logo.png" alt=""></img>
       <div className="google" id="googleMap" ></div>
          <div className="footer-social">
            <a href="#" target="_blank"><i className="fab fa-facebook-square"></i></a>
            <a href="#" target="_blank"><i className="fab fa-twitter-square"></i></a>
            <a href="#" target="_blank"><i className="fab fa-youtube-square"></i></a>
            <a href="#" target="_blank"><i className="fab fa-instagram-square"></i></a>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="footer-menu">
          <h2 className="footer-wid-title">User Navigation </h2>
          <ul>
            <li><a href="">My account</a></li>
            <li><a href="">Order history</a></li>
            <li><a href="">Wishlist</a></li>
            <li><a href="">Vendor contact</a></li>
            <li><a href="">Front page</a></li>
          </ul>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="footer-menu">
          <h2 className="footer-wid-title">Categories</h2>
          <ul>
            <li><a href="">Men's Sportswear</a></li>
            <li><a href="">Women's Sportswear</a></li>
            <li><a href="">Sports Accessories</a></li>
            <li><a href="">Energy Gel</a></li>
            <li><a href="">Promotion</a></li>
          </ul>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="footer-newsletter">
          <h2 className="footer-wid-title">Newsletter</h2>
          <p>Sign up to our newsletter and get exclusive deals you wont find anywhere else straight to your inbox!</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Type your email"/>
            <input type="submit" value="Subscribe"/>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="copyright">
            <p>&copy; 2015 uCommerce. All Rights Reserved. <a href="https://sportshop.vn"
                target="_blank">https://sportshop.vn</a></p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="footer-card-icon">
            <i className="fab fa-cc-discover"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-visa"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</footer>
    </div>
  )
}
