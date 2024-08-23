import React from "react";
import Navbar from "../navbar/navbar";
export default function Header() {
  return (
    <div>
      <div className="col-lg-12 col-sm-12">
        <div
          className="header-top-contact lh-0 p-0 bg-white"
          style={{ width: "100%", height: "25px" }}
        >
          <marquee
            className="p-0 m-0"
            style={{
              position: "relative",
              color: "red",
              background: "transparent",
              fontWeight: "bold",
              fontSize: "15px",
              height: "25px",
              color: "#ad0000",
            }}
          >
            Platforma sinov tariqasida ishga tushirilgan
          </marquee>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-9">
            <div className="header-top-contact float-start">
              <ul>
                <li>
                  <a href="mailto:info@uznature.uz">
                    <i className="fal fa-envelope"></i>info@uznature.uz
                  </a>
                </li>
                <li>
                  <a href="tel:+008012345678">
                    <i className="fal fa-phone-alt"></i>71 207 07 70
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-sm-3">
            <div className="header-top-left float-end">
              <ul>
                <li className="has-dropdown">
                  <a href="#">UZ</a>
                  <ul>
                    <li>
                      <a href="#">RU</a>
                    </li>
                    <li>
                      <a href="#">EN</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
