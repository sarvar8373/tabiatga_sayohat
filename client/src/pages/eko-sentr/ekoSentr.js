import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function Ekosentr() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Ekosentr</title>
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
                <h3>Ekosentr</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Ekosentr</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="partner-area pt-85 pb-220">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10"></div>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
}
