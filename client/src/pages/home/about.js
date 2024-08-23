import React from "react";

export default function About() {
  return (
    <div className="about-area pb-115">
      <div className="about-bg">
        <img src="img/about/1.png" alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-lg-6">
            <div className="section-title">
              <p className="title">BIZ BILAN TANISHING</p>
              <h2>
                Sarguzasht bilan<span></span> Sayohat boshlang
              </h2>
            </div>
            <div className="about-content">
              <p>
                Biznig kompaniyamiz va sizni yaxshiroq tanishish uchun bizga eng
                muhimdir. faqatgina o'smirlar uchun tabiat sarguzashtlari bilan
                cheklanmaydi; bu siz haqingizda ham. Biz sizning eng yaxshi
                tomonlaringizni kashf etishingizni xohlaymiz va katta ochiq
                havoda buning amalga oshishini ishonamiz.
              </p>
              <a href="/about" className="btn btn-theme">
                Batafsil
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
