import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/host/host";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function Detail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tours/tour/${id}`);
        if (response.data.Status) {
          setTour(response.data.Result);
        } else {
          setError("Tour not found");
        }
      } catch (err) {
        setError("Error fetching Tour data");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>{tour.title}</title>
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
                <h3>Postlar</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Tizimga kirish</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="adventure-details-area pt-90 pb-110">
        <div className="container">
          <div className="row">
            <div className="col"></div>
          </div>
          <div className="row justify-content-center pb-50 pt-50">
            <div className="col-lg-10">
              <div className="dis-alpine section-title text-center">
                <h2>{tour.title}</h2>
                <div className="sin-sis-alpine-wrap">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="single-alpine">
                        <h4>Byudjet</h4>
                        <h3>{tour.price}</h3>
                        <p>{tour.price_description}</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-alpine">
                        <h4>Budjet</h4>
                        <ul>
                          <li>
                            <i className="fas fa-star"></i>
                          </li>
                          <li>
                            <i className="fas fa-star"></i>
                          </li>
                          <li>
                            <i className="fas fa-star"></i>
                          </li>
                          <li>
                            <i className="fas fa-star"></i>
                          </li>
                          <li>
                            <i className="fas fa-star"></i>
                          </li>
                        </ul>
                        <p>15 Sharhlar</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-alpine">
                        <h4>Davomiyligi</h4>
                        <h3>1 kunlar</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="alpine-left-content mb-40">
                {tour.description}
                <a href="/" className="btn btn-theme mt-3">
                  Ushbu sayohatni bron qiling
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="appline-right">
                <div className="alpine-info-wrap">
                  <h4>Sayohat haqida ma'lumot</h4>
                  <div className="trip-info-wrap">
                    <div className="trip-info-one">
                      <div className="trip-content-one">
                        <p>Boshlash</p>
                        <p>Tugatish</p>
                        <p>Mamlakatlar</p>
                      </div>
                      <div class="trip-content-two">
                        <p>9:00</p>
                        <p>12:00</p>
                        <p>Toshkent viloyati</p>
                      </div>
                    </div>
                    <div className="trip-fifo-tow">
                      <div className="trip-content-one">
                        <p> yoshi</p>
                        <p>Odamlar soni</p>
                        <p>Mavsum</p>
                      </div>
                      <div class="trip-content-two">
                        <p>12+</p>
                        <p>2-6 Odamlar</p>
                        <p>Noyabr-Yanvar</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="acivement-wrap">
                  <div className="single-acivement">
                    <h4>Faoliyatlar</h4>
                    <ul>
                      <li>
                        <img src="img/icon/a1.png" alt="" />
                        <span>Kemping</span>
                      </li>
                      <li>
                        <img src="img/icon/a2.png" alt="" />
                        <span>Kemping</span>
                      </li>
                      <li>
                        <img src="img/icon/a6.png" alt="" />
                        <span>Kemping</span>
                      </li>
                    </ul>
                  </div>
                  <div className="single-acivement">
                    <h4>Faoliyatlar</h4>
                    <ul>
                      <li>
                        <img src="img/icon/n1.png" alt="" />
                        <span>Oddiy</span>
                      </li>
                      <li>
                        <img src="img/icon/n2.png" alt="" />
                        <span>O'rta</span>
                      </li>
                      <li>
                        <img src="img/icon/n3.png" alt="" />
                        <span>Ekstremal</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inclution-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-title text-center">
                <p className="title">Muhim sayohat ma'lumotlari</p>
                <h2>TRIP qo'shimchalari</h2>
                <p>
                  Ushbu sayohat haqida chuqurroq ma'lumot olishni xohlaysizmi?
                  Muhim sayohat Ma'lumot batafsil marshrutni, viza haqida
                  ma'lumotni, qanday qilish kerakligini ko'rsatadi
                  mehmonxonangizga boring, nima bor - deyarli hamma narsa bu
                  sarguzasht va boshqalar haqida bilishingiz kerak.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="inclution-wrap">
                <div className="single-inclution">
                  <div className="inclution-thumb">
                    <img src="img/icon/i1.png" alt="" />
                  </div>
                  <div className="inclution-content">
                    <h4>Turar joy</h4>
                    <p>Mehmonxona (3 kechalar), Kemping (1 tun)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="inclution-wrap">
                <div className="single-inclution">
                  <div className="inclution-thumb">
                    <img src="img/icon/i2.png" alt="" />
                  </div>
                  <div className="inclution-content">
                    <h4>Ovqatlar</h4>
                    <p>8 nonushta, 3 tushlik, 2 kechki ovqatlar</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="inclution-wrap">
                <div className="single-inclution">
                  <div className="inclution-thumb">
                    <img src="img/icon/i3.png" alt="" />
                  </div>
                  <div class="inclution-content">
                    <h4>Transport</h4>
                    <p>Poyezd, Jamoat avtobusi, Taksi, Tramvay, Metro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trip-date-area pt-100 pb-150">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center">
                <p className="title">Trip Date and Time</p>
                <h2>
                  Biz u erda bo'lamiz, xuddi biz kabi<span></span> oldin u erda
                  bo'lgan
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="trip-table table-responsive">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col">
                      <p className="pl-15">Ketish</p>
                    </th>
                    <th scope="col">
                      <p>Tugatish</p>
                    </th>
                    <th scope="col">
                      <p>Safar holati</p>
                    </th>
                    <th scope="col">
                      <p>
                        Sayohat narxi<small>Bir kishi uchun</small>
                      </p>
                    </th>
                    <th scope="col">
                      <p>Harakat</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <span className="pl-15">2022 yil 25 aprel dushanba</span>
                    </th>
                    <td>2022 yil 3 may, seshanba</td>
                    <td>Mavjud</td>
                    <td>$1,205 - $2,205</td>
                    <td className="button">
                      <a className="btn-bor" href="/">
                        Hozir band qiling
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="pl-15">Mon 9 2022 yil may</span>
                    </th>
                    <td>2022 yil 17-may, seshanba</td>
                    <td>Mavjud</td>
                    <td>$2,205 - $3,350</td>
                    <td className="button">
                      <a className="btn-theme" href="/">
                        Kutishda joylashtirish
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
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
