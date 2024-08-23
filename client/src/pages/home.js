import React from "react";
import Header from "../components/header/header";
import Section from "../components/section/section";
import Quick from "./home/quick";
import About from "./home/about";
import Funfact from "./home/funfact";
import Selling from "./home/selling";
import HomeBlog from "./home/homeBlog";
import Partner from "./home/partner";
import Footer from "../components/footer/footer";
import Adventure from "./home/adveture";
import Guide from "./home/guide";
import { Helmet, HelmetProvider } from "react-helmet-async";
export default function Home() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Tabiatga sayohat markazi</title>
        </Helmet>
      </HelmetProvider>

      <header id="header" className="header-area absulate-header">
        <Header />
      </header>
      <Section />
      <Quick />
      <Adventure />
      <About />
      <Funfact />
      <Selling />
      <div className="subscribe-area pt-100 pb-100 pb0-320">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title">
                <p className="title">Taklif va talab</p>
                <h2>
                  Bizga talab va takliflaringiz bo'lsa <span></span> yozib
                  qoldiring
                </h2>
              </div>
              <form className="gane-form">
                <div className="single-field half-field">
                  <input
                    type="text"
                    className="form-control"
                    id="usr"
                    placeholder="FIO *"
                    required
                  />
                </div>
                <div className="single-field half-field-last">
                  <input
                    type="tel"
                    className="form-control"
                    id="usr"
                    placeholder="+998"
                    required
                  />
                </div>
                <div className="single-field">
                  <textarea
                    className="form-control"
                    rows="5"
                    id="comment"
                    placeholder="XABARNI YOZING"
                  ></textarea>
                </div>
                <button className="btn btn-theme" type="submit">
                  Yuborish
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <HomeBlog />
      <Guide />
      <Partner />
      <Footer />
    </div>
  );
}
