import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { BASE_URL } from "../../api/host/host";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import styles from "../../style/App.module.css";

export default function Adventure() {
  const [adventures, setAdventures] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adventurePerPage] = useState(4);
  const [tours, setTours] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tours/`);
        if (response.data.Status) {
          setAdventures(response.data.Result);
          const tourPromises = response.data.Result.map((adventure) =>
            axios.get(
              `${BASE_URL}/services/tour_services/${adventure.tourism_service_id}`
            )
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
          setError("Sayohat Maskanlari topilmadi");
        }
      } catch (err) {
        setError("Error fetching post data");
      }
    };
    fetchPost();
  }, []);

  // Pagination logic
  const indexOfLastAdventure = currentPage * adventurePerPage;
  const indexOfFirstAdventure = indexOfLastAdventure - adventurePerPage;
  const currentAdventures = adventures.slice(
    indexOfFirstAdventure,
    indexOfLastAdventure
  );
  const totalPages = Math.ceil(adventures.length / adventurePerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return `${words.slice(0, wordLimit).join(" ")}...`;
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Sayohat kompaniyari</title>
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
                <p>{error}</p>
                <h3>Sayohat kompaniyari</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Sayohat kompaniyari</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="adventure-grid-area style-2 pt-90 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-8">
                  {" "}
                  <div className="adventure-select">
                    <form action="#" className="adventure-select-form style-2">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        // This sets the initial selected value
                      >
                        <option value="">Narxi filtrlash</option>
                        <option value="1">Yuqori narx</option>
                        <option value="2">Arzon narx</option>
                      </select>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="view-grid">
                    <ul>
                      <li className="active">
                        <a href="/">
                          <i className="fal fa-list-ul"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {currentAdventures
                .filter((adventure) => adventure.status !== 0)
                .map((adventure) => (
                  <div className="single-adventure style-2" key={adventure.id}>
                    <div
                      className="advanture-thumb"
                      style={{ width: "370px", height: "auto" }}
                    >
                      {adventure.images && adventure.images.split(",")[0] && (
                        <img
                          src={`${BASE_URL}/uploads/${
                            adventure.images.split(",")[0]
                          }`}
                          alt={adventure.title}
                          style={{ width: "370px", height: "100%" }}
                        />
                      )}

                      <div className="adv-thumb-item">
                        <ul>
                          <li>
                            <img src="img/icon/t1.png" alt="" />
                          </li>
                          <li>
                            <img src="img/icon/t2.png" alt="" />
                          </li>
                          <li>
                            <img src="img/icon/t3.png" alt="" />
                          </li>
                          <li>
                            <img src="img/icon/t4.png" alt="" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="adventure-content">
                      <p className="tour">
                        {tours[adventure.tourism_service_id]}
                      </p>
                      <p className="tour">{adventure.tour}</p>
                      <Link to={`/detail/${adventure.id}`}>
                        <h6 className={styles.font}>{adventure.title}</h6>
                      </Link>
                      <ul className="review">
                        <li>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </li>
                      </ul>
                      <p>{truncateDescription(adventure.description, 30)}</p>
                      <p className="price float-start">
                        {adventure.price}{" "}
                        <small>{adventure.priceDescription}</small>
                      </p>
                      <Link
                        className="btn float-end btn-theme px-5 py-2 text-white"
                        to={`/detail/${adventure.id}`}
                      >
                        Batafsil
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col">
              <div className="gane-pagination mt-30 text-center">
                <ul>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      <span onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </span>
                    </li>
                  ))}
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
      </div>
      <Footer />
    </div>
  );
}
