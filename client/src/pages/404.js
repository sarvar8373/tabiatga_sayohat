import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export default function Error() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Sharsharalar</title>
        </Helmet>
      </HelmetProvider>
      <header
        id="header"
        className="header-area style-2 header-border absulate-header"
      >
        <Header />
      </header>
      <div className="bradcumb-area cart overlay-bg-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <div className="bradcumb text-center">
                <h3>Xatolik</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Xatolik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-90">
        <h1 className="text-center">
          {" "}
          Iltimos tekshirib ko'ring
          <span className="text-danger">
            {" "}
            <br />
            404 xatolik bor
          </span>
        </h1>
      </div>
      <div className="partner-area pt-85 pb-220">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
