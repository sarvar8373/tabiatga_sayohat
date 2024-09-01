import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/host/host";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";
import AdventureModal from "../adventure/modal";
import CustomCarousel from "../../components/carousel/carousel";

export default function Detail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState({});
  const [selectedAdventure, setSelectedAdventure] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tours/tour/${id}`);
        if (response.data.Status) {
          const tourData = response.data.Result;
          setTour(tourData);

          // Assuming tourData.tourism_service_id is an array of IDs
          const serviceIds = [tourData.tourism_service_id]; // Adjust if this is not an array
          const tourPromises = serviceIds.map((serviceId) =>
            axios.get(`${BASE_URL}/services/tour_services/${serviceId}`)
          );

          const tourResponses = await Promise.all(tourPromises);
          const tourMap = {};
          tourResponses.forEach((res) => {
            if (res.data.Status) {
              tourMap[res.data.Result.id] = res.data.Result.name;
            }
          });
          setTours(tourMap);
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
                <h3>{tour.title}</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>{tour.title}</li>
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
                        <h4>Narxi</h4>
                        <h3>{tour.price}</h3>
                        <p>{tour.price_description}</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-alpine">
                        <h4>Reytingi</h4>
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
                        <h3>1 kun</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CustomCarousel
                images={tour.images}
                width="100%"
                height="500px"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="alpine-left-content mb-40">
                {tour.description}
                <br />
                <Button
                  type="button"
                  className="btn btn-theme mt-3 border-0"
                  onClick={() => {
                    setSelectedAdventure(tour);
                    setShowModal(true);
                  }}
                >
                  Bron qiling
                </Button>
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
                      <div className="trip-content-two">
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
                      <div className="trip-content-two">
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
                        <img
                          src="/img/icon/e2.png"
                          alt=""
                          style={{ height: "50px" }}
                          width="50"
                        />
                        <span>{tours[tour.tourism_service_id]}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="single-acivement">
                    <h4>Bog'lanish</h4>
                    <ul>
                      <li>
                        <img
                          src="/img/icon/c3.png"
                          alt=""
                          style={{ height: "50px" }}
                        />
                        <span> +99899333333</span>
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
                <h2>Qo'shimcha ma'lumotlar</h2>
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
                    <img src="/img/icon/i1.png" alt="" />
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
                    <img src="/img/icon/i2.png" alt="" />
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
                    <img src="/img/icon/i3.png" alt="" />
                  </div>
                  <div className="inclution-content">
                    <h4>Transport</h4>
                    <p>Poyezd, Jamoat avtobusi, Taksi, Tramvay, Metro</p>
                  </div>
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
      {selectedAdventure && (
        <AdventureModal
          adventure={selectedAdventure}
          showModal={showModal}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
