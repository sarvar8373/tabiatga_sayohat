import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="footer-area pt-85 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-8">
              <div className="widget contact-widget">
                <h3>Sayohat haqida</h3>
                <p>
                  Sarguzasht - bu sizning qiziqishingizga ergashish va noma'lum
                  narsalarni kashf qilish erkinligiga ega bo'lishdir. Sayohat
                  uslubi qanday bo'lishidan qat'i nazar, bizning turlarimiz
                  yaxshi rejalashtirilgan marshrutlarni o'z ishingizni qilish va
                  o'zingiz bir oz kashf qilish moslashuvchanligi bilan
                  muvozanatlashtiradi.
                </p>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-sm-8">
              <div className="widget quick-link-categories">
                <h3>Menyular</h3>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fal fa-angle-right"></i>Ekskursiyalar
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-angle-right"></i>Dam olish joylari
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-angle-right"></i>Eko sentr
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-angle-right"></i>Yo'nalishlar
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-angle-right"></i>Sayohat
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-angle-right"></i>Bog'lanish
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-sm-8">
              <div className="widget contact-us">
                <h3>Bog'lanish</h3>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fal fa-paper-plane"></i>
                      Buxoro viloyati, 200700, Kogon shahri, GSP
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-envelope"></i>support@eco.uz
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-phone-alt"></i>+99893 683 93 81
                      +99894 653 22 81, +99894 540 03 07 +99891 418 55 65
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copy-right-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="copyright-text text-center">
                <p>© 2024 All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
