import React from "react";

export default function Partner() {
  return (
    <div className="partner-area pb-220">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-title text-center">
              <p className="title">Bizning hamkorlarimiz</p>
              <h2>
                Biz sizga eng yaxshisini berish uchun birlashamiz<span></span>{" "}
                tengsiz tajriba
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="partner-wrap owl-carousel">
              <div className="single-partner">
                <img className="bottom" src="img/partner/1.jpg" alt="" />
                <img className="top" src="img/partner/1-1.jpg" alt="" />
              </div>
              <div className="single-partner">
                <img className="bottom" src="img/partner/2.jpg" alt="" />
                <img className="top" src="img/partner/2-2.jpg" alt="" />
              </div>
              <div className="single-partner">
                <img className="bottom" src="img/partner/3.jpg" alt="" />
                <img className="top" src="img/partner/3-3.jpg" alt="" />
              </div>
              <div className="single-partner">
                <img className="bottom" src="img/partner/4.jpg" alt="" />
                <img className="top" src="img/partner/4-4.jpg" alt="" />
              </div>
              <div className="single-partner">
                <img className="bottom" src="img/partner/5.jpg" alt="" />
                <img className="top" src="img/partner/5-5.jpg" alt="" />
              </div>
              <div className="single-partner">
                <img className="bottom" src="img/partner/6.jpg" alt="" />
                <img className="top" src="img/partner/6-6.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
