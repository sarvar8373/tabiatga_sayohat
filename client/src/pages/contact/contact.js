import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { HelmetProvider, Helmet } from "react-helmet-async";

export const Contact = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Bog'lanish</title>
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
                <h3>Bog‘lanish</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Bog‘lanish</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-area pt-90 pb-95">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-title text-center">
                <p className="title">Bog'lanish uchun ma'lumot</p>
                <h2>
                  Biz xohlaymiz<span></span> Sizdan eshitish
                </h2>
                <p>
                  Sayohatga talab yuqori! Qo'ng'iroq va suhbatni kutish vaqtlari
                  odatdagidan uzoqroq. Biz buning ustida ishlayapmiz va
                  sabr-toqatingiz uchun minnatdormiz. Biz bilan bog‘lanish oson
                  va biz sizdan xabar olishni xohlaymiz. Sarguzashtlarni boshdan
                  kechirmoqchimisiz yoki endigina orzu qilishni boshlayapsizmi,
                  bog'laning va biz sizga yo'lingizda yordam beramiz.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div
                className="single-contact text-center"
                style={{ border: "none" }}
              >
                <div className="contact-thumb">
                  <img src="img/icon/c1.png" alt="" />
                </div>
                <div className="contact-content">
                  <h4>Bizning joylashuvimiz</h4>
                  <p>Buxoro viloyati, 200700, Kogon shahri, GSP</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div
                className="single-contact text-center"
                style={{ border: "none" }}
              >
                <div className="contact-thumb">
                  <img src="img/icon/c2.png" alt="" />
                </div>
                <div className="contact-content">
                  <h4>Keling, suhbatlashamiz!</h4>
                  <p>Dushanba - Shanba: 9:00 dan 20:00 EST Yakshanba: Yopiq</p>
                  <a href="/" className="chat">
                    Biz bilan suhbatlashing
                    <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div
                className="single-contact text-center"
                style={{ border: "none" }}
              >
                <div className="contact-thumb">
                  <img src="img/icon/c3.png" alt="" />
                </div>
                <div className="contact-content">
                  <h4>Telefon va faks</h4>
                  <p>
                    Mobil: <a href="tel:+008012345678">+998 91 418 55 65</a>
                  </p>
                  <p>
                    Telefon: <a href="tel:+008012345678">+998 71 207 07 70</a>
                  </p>
                  <p>
                    Fax: <a href="tel:+008012345678">+2-3456-6789</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div
                className="single-contact text-center"
                style={{ border: "none" }}
              >
                <div className="contact-thumb">
                  <img src="img/icon/c4.png" alt="" />
                </div>
                <div className="contact-content">
                  <h4>E-pochta manzili</h4>
                  <a href="mailto:yourname@email.com">support@eco.uz</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="google-map-area">
        <div className="google-map-wrap">
          <div className="fullwide-map">
            <div
              id="map_canvas"
              style={{ width: "100%", height: "760px" }}
            ></div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="section-title pt-90">
                <p className="title">bog'laning</p>
                <h2>
                  Bizga liniya qoldiring. Biz yaxshi ko'ramiz<span></span>{" "}
                  sizdan eshitish uchun!
                </h2>
              </div>
              <div className="contact-p-contact pb-70">
                <form action="#" className="gane-form">
                  <div className="single-field half-field">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="single-field half-field-last">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="single-field half-field">
                    <input
                      type="email"
                      className="form-control"
                      id="usr"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="single-field half-field-last">
                    <input
                      type="tel"
                      className="form-control"
                      id="usr"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="single-field">
                    <textarea
                      className="form-control"
                      rows="5"
                      id="comment"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <button className="btn btn-theme" type="submit">
                    Send Message
                  </button>
                </form>
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
};
