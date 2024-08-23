import React from "react";

export default function HomeBlog() {
  return (
    <div className="home-blog-area pt-100 pb-80 pb-res pb0-320">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-sm-12">
            <div className="section-title text-center">
              <p className="title">Blogdan</p>
              <h2>
                Yangiliklar hikoyalar va fikrlar<span></span>
                hayotingizni sarguzasht bilan to'ldirish uchun
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="single-post-blog">
              <div className="post-thumbnail">
                <img src="img/post/1.jpg" alt="" />
              </div>
              <div className="post-date">
                <p>
                  12 <span>May</span>
                </p>
              </div>
              <div className="post-blog-content">
                <a href="/">
                  <h4>Kater pandemiyadan keyin rivojlanadimi?</h4>
                </a>
                <p>
                  Hozirgi vaqtda yaxtalarni ijaraga berish bozori prognoz
                  davrida (2020 - 2025) taxminan 4% CAGRni ro'yxatdan o'tkazishi
                  kutilmoqda.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-post-blog">
              <div className="post-thumbnail">
                <img src="img/post/2.jpg" alt="" />
              </div>
              <div className="post-date">
                <p>
                  12 <span>May</span>
                </p>
              </div>
              <div className="post-blog-content">
                <a href="/">
                  <h4>Sayohat kutilganidan tezroq tiklanadi</h4>
                </a>
                <p>
                  Hozirda yaxtalar ijarasi bozori ro'yxatdan o'tishi kutilmoqda
                  prognoz davrida (2020 - 2025) taxminan 4% CAGR.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-post-blog">
              <div className="post-thumbnail">
                <img src="img/post/3.jpg" alt="" />
              </div>
              <div className="post-date">
                <p>
                  12 <span>May</span>
                </p>
              </div>
              <div className="post-blog-content">
                <a href="/">
                  <h4>Sayyohlar uchun ochiq eshiklar</h4>
                </a>
                <p>
                  Hozirda yaxtalar ijarasi bozori ro'yxatdan o'tishi kutilmoqda
                  prognoz davrida (2020 - 2025) taxminan 4% CAGR.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-post-blog">
              <div className="post-thumbnail">
                <img src="img/post/4.jpg" alt="" />
              </div>
              <div className="post-date">
                <p>
                  12 <span>May</span>
                </p>
              </div>
              <div className="post-blog-content">
                <a href="/">
                  <h4>15-sentabrdan boshlanadi</h4>
                </a>
                <p>
                  Hozirda yaxtalar ijarasi bozori ro'yxatdan o'tishi kutilmoqda
                  prognoz davrida (2020 - 2025) taxminan 4% CAGR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
