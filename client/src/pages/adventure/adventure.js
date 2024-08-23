import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Modal from "./modal";
import { BASE_URL } from "../../api/host/host";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
export default function Adventure() {
  const [adventures, setAdventures] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adventurePerPage] = useState(4); // Number of posts per page
  // const indexOfLastPost = currentPage * adventurePerPage;
  // const indexOfFirstPost = indexOfLastPost - adventurePerPage;
  // const currentPosts = adventures.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(adventures.length / adventurePerPage);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tours/`);
        if (response.data.Status) {
          setAdventures(response.data.Result); // Fetch surrounding posts using the current ID
        } else {
          setError("Tours not found");
        }
      } catch (err) {
        setError("Error fetching post data");
      }
    };
    fetchPost();
  });
  // Handle page change
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
                  <div className="show-result-text">
                    <p>
                      “Sarguzashtlar” uchun 27 dan ortiq natijadan 1-9 tasi
                      koʻrsatilmoqda
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="adventure-select">
                    <form action="#" className="adventure-select-form style-2">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue="1" // This sets the initial selected value
                      >
                        <option value="" disabled>
                          Narxi
                        </option>
                        <option value="1">Qimmat</option>
                        <option value="2">Arzon</option>
                      </select>
                      <div className="view-grid">
                        <ul>
                          <li>
                            <a href="/">
                              <i className="fal fa-th"></i>
                            </a>
                          </li>
                          <li className="active">
                            <a href="/">
                              <i className="fal fa-list-ul"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {adventures.map((adventure, index) => (
                <div className="single-adventure style-2" key={index}>
                  <div
                    className="advanture-thumb"
                    style={{ width: "370px", height: "275px" }}
                  >
                    <img
                      src={`${BASE_URL}/uploads/${adventure.image}`}
                      alt="adventure"
                      style={{ width: "370px", height: "275px" }}
                    />
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
                    <p className="tour">{adventure.tour}</p>
                    <Link to={`/detail/${adventure.id}`}>
                      <h6>{adventure.title}</h6>
                    </Link>
                    <ul className="review">
                      <li>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </li>
                    </ul>
                    <p>{truncateDescription(adventure.description, 30)}</p>
                    <p className="price">
                      {adventure.price}{" "}
                      <small>{adventure.priceDescription}</small>
                    </p>
                    <button
                      type="button"
                      className="btn btn-theme px-3 py-2 mx-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Buyurtma berish
                    </button>
                    <Modal />
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
      </div>{" "}
      <Footer />
    </div>
  );
}
