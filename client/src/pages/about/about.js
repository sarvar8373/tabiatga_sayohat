import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
export default function About() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Biz haqimizda</title>
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
                <h3>Biz haqimizda</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Biz haqimizda</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-adventure-area pt-110 pb-150">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="section-title text-center">
                <p class="title">Nima uchun boshqalardan yaxshiroq?</p>
                <h2>
                  Yangisini urish vaqti keldi <span></span> Tadqiqotga yo'l.
                </h2>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <p class="text-center mb-45">
                Barcha sarguzashtlar! Siz go'zallikdan zavqlanishni xohlaysizmi?
                dengiz, quruqlik va tog'lar orasidagi tabiat? Keyin bor oldinda,
                Adventure o'zingizni ochiq havoda cho'milish uchun shu yerda
                ajoyib kontrastlar bilan to'ldirilgan sarguzasht: samimiy va
                umumiy, maqsadli.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <div class="single-about-adventure text-center">
                <div class="about-ad-thumb">
                  <img src="img/adventure/1.png" alt="" />
                </div>
                <div class="about-ad-content">
                  <h4>Sayohat tajribalari</h4>
                  <p>
                    Yuklaringizni yig'ish va keyingi safaringizga tayyorlanish
                    vaqti keldi Biz olib borayotgan ekskursiyalarni tekshiring.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="single-about-adventure text-center">
                <div class="about-ad-thumb">
                  <img src="img/adventure/2.png" alt="" />
                </div>
                <div class="about-ad-content">
                  <h4>Xalqaro sayohatlar</h4>
                  <p>
                    Yuklaringizni yig'ish va keyingi safaringizga tayyorlanish
                    vaqti keldi Biz olib borayotgan ekskursiyalarni tekshiring.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="single-about-adventure text-center">
                <div class="about-ad-thumb">
                  <img src="img/adventure/3.png" alt="" />
                </div>
                <div class="about-ad-content">
                  <h4>Eng yaxshi narx kafolatlangan</h4>
                  <p>
                    Yuklaringizni yig'ish va keyingi safaringizga tayyorlanish
                    vaqti keldi Biz olib borayotgan ekskursiyalarni tekshiring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-camping-arrea pb-150">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title text-center">
                <p class="title">BA'ZI AJOYIB XUSUSIYATLAR</p>
                <h2>
                  Biz u erda bo'lamiz, xuddi bizda bo'lgani kabi <span></span>{" "}
                  oldin u erda bo'lgan.
                </h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-sm-4">
              <div class="single-about-feature">
                <div class="about-fre-thumb">
                  <img src="img/icon/1.png" alt="" />
                </div>
                <div class="about-fre-content">
                  <h4>Kemping</h4>
                  <p>
                    Mahalliy mutaxassis bilan dunyomizning yovvoyi tomonlarini
                    o'rganing sumkalaringizni yig'ish va keyingi
                    sarguzashtingizga tayyorlanish uchun.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-4">
              <div class="single-about-feature">
                <div class="about-fre-thumb">
                  <img src="img/icon/2.png" alt="" />
                </div>
                <div class="about-fre-content">
                  <h4>Piyoda yurish</h4>
                  <p>
                    Mahalliy mutaxassis bilan dunyomizning yovvoyi tomonlarini
                    o'rganing qaerga borishni va qanday qilib xavfsiz qolishni
                    biladigan rahbarlar. Vaqt keldi sumkalaringizni yig'ish va
                    keyingi sarguzashtingizga tayyorlanish uchun.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-4">
              <div class="single-about-feature">
                <div class="about-fre-thumb">
                  <img src="img/icon/3.png" alt="" />
                </div>
                <div class="about-fre-content">
                  <h4>Plyaj sayohatlari</h4>
                  <p>
                    Mahalliy mutaxassis bilan dunyomizning yovvoyi tomonlarini
                    o'rganing qaerga borishni va qanday qilib xavfsiz qolishni
                    biladigan rahbarlar. Vaqt keldi sumkalaringizni yig'ish va
                    keyingi sarguzashtingizga tayyorlanish uchun.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-4">
              <div class="single-about-feature">
                <div class="about-fre-thumb">
                  <img src="img/icon/5.png" alt="" />
                </div>
                <div class="about-fre-content">
                  <h4>Safari</h4>
                  <p>
                    Mahalliy mutaxassis bilan dunyomizning yovvoyi tomonlarini
                    o'rganing qaerga borishni va qanday qilib xavfsiz qolishni
                    biladigan rahbarlar. Vaqt keldi sumkalaringizni yig'ish va
                    keyingi sarguzashtingizga tayyorlanish uchun.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-4">
              <div class="single-about-feature">
                <div class="about-fre-thumb">
                  <img src="img/icon/11.png" alt="" />
                </div>
                <div class="about-fre-content">
                  <h4>Tog' velosipedi</h4>
                  <p>
                    Mahalliy mutaxassis bilan dunyomizning yovvoyi tomonlarini
                    o'rganing qaerga borishni va qanday qilib xavfsiz qolishni
                    biladigan rahbarlar. Vaqt keldi sumkalaringizni yig'ish va
                    keyingi sarguzashtingizga tayyorlanish uchun.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-4">
              <div class="single-about-feature">
                <div class="about-fre-thumb">
                  <img src="img/icon/15.png" alt="" />
                </div>
                <div class="about-fre-content">
                  <h4>Kruiz sayohati</h4>
                  <p>
                    Mahalliy mutaxassis bilan dunyomizning yovvoyi tomonlarini
                    o'rganing qaerga borishni va qanday qilib xavfsiz qolishni
                    biladigan rahbarlar. Vaqt keldi sumkalaringizni yig'ish va
                    keyingi sarguzashtingizga tayyorlanish uchun.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-4">
              <div class="single-about-feature">
                <div class="about-fre-thumb">
                  <img src="img/icon/4.png" alt="" />
                </div>
                <div class="about-fre-content">
                  <h4>Serfing</h4>
                  <p>
                    Mahalliy mutaxassis bilan dunyomizning yovvoyi tomonlarini
                    o'rganing qaerga borishni va qanday qilib xavfsiz qolishni
                    biladigan rahbarlar. Vaqt keldi sumkalaringizni yig'ish va
                    keyingi sarguzashtingizga tayyorlanish uchun.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-4">
              <div class="single-about-feature">
                <div class="about-fre-thumb">
                  <img src="img/icon/12.png" alt="" />
                </div>
                <div class="about-fre-content">
                  <h4>Qishki lager</h4>
                  <p>
                    Mahalliy mutaxassis bilan dunyomizning yovvoyi tomonlarini
                    o'rganing qaerga borishni va qanday qilib xavfsiz qolishni
                    biladigan rahbarlar. Vaqt keldi sumkalaringizni yig'ish va
                    keyingi sarguzashtingizga tayyorlanish uchun
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-free-area">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="about-fre-bottom text-center">
                <h3>
                  Mutaxassislarning to'liq jamoasi siz bilan oldin, oldin va
                  keyin sayohat
                </h3>
                <h2>Keyingi sarguzashtingizni toping</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-expart-area pt-110">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xxl-5 col-sm-7">
              <div class="section-title text-center">
                <p class="title">Bizning mutaxassisligimiz</p>
                <h2>
                  Nima uchun sayohat <span></span>Sarguzasht
                </h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <div class="about-single-expart">
                <div class="about-ex-thumb">
                  <img src="img/icon/e1.png" alt="" />
                </div>
                <div class="about-ex-content">
                  <h4>30+ YIL TAJRIBASI</h4>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="about-single-expart">
                <div class="about-ex-thumb">
                  <img src="img/icon/e2.png" alt="" />
                </div>
                <div class="about-ex-content">
                  <h4>MALAKALIY EKSPERT</h4>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="about-single-expart">
                <div class="about-ex-thumb">
                  <img src="img/icon/e3.png" alt="" />
                </div>
                <div class="about-ex-content">
                  <h4>SIZ HAQIQIYATDA MUMKIN KOMPANIYA</h4>
                </div>
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
