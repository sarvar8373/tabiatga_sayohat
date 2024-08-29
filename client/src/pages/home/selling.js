import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/host/host";
import axios from "axios";
import Modal from "../adventure/modal";
import { Link } from "react-router-dom";

export default function Selling() {
  const [adventures, setAdventures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tours`);
        if (response.data.Status) {
          // Slice the last 5 adventures
          setAdventures(response.data.Result.slice(-6));
        } else {
          setError("Tours not found");
        }
      } catch (err) {
        setError("Error fetching post data");
      }
    };
    fetchPost();
  }, []);

  return (
    <div className="selling-tips-area pb-80 pt-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="selling-tips-wrap">
              <div className="single-selling-tips section-title">
                <p className="title">ENG YAXSHI SOTILGAN sayohatlar</p>
                <h2>
                  Eng yuqori baholangan tajribalar <span></span> Sarguzashtlar
                  haqida
                </h2>
                <p>
                  Sumkalaringizni yig'ish va keyingi sarguzashtingizga
                  tayyorgarlik ko'rish vaqti keldi. yilning barcha oylarida
                  o'tkaziladigan sayohatlarimizni ko'rib chiqing va agar sizda
                  biron bir narsani ko'rsangiz, bron qiling! Biz ham siz kabi
                  katta va go'zal dunyomizni kashf qilishdan xursandmiz.
                </p>
                <a href="/posts" className="btn btn-theme mt-30">
                  Batafsil
                </a>
              </div>
            </div>
          </div>
          {adventures.map((adventure) => (
            <div className="col-lg-3 col-sm-6" key={adventure.id}>
              <div className="single-adventure">
                <img
                  src={`${BASE_URL}/uploads/${adventure.image}`}
                  alt="adventure"
                />
                <div className="adventure-content">
                  <p className="tour">{adventure.tour}</p>
                  <Link to={`/detail/${adventure.id}`}>
                    <h6>{adventure.title}</h6>
                  </Link>
                  <p className="price">{adventure.price}</p>
                  <p>{adventure.price_description}</p>
                  <button
                    type="button"
                    className="btn btn-theme px-3 py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Buyurtma berish
                  </button>
                  <Modal />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
