import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/host/host";
import axios from "axios";
export default function Section() {
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [error, setError] = useState("");
  const [selectedMavsum, setSelectedMavsum] = useState("");

  useEffect(() => {
    // Fetch regions
    axios
      .get(`${BASE_URL}/region/regions`)
      .then((response) => {
        if (response.data.Status) {
          setRegions(response.data.Result);
        } else {
          setError(response.data.Error);
        }
      })
      .catch((err) => {
        setError("Error fetching regions.");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      // Fetch districts based on selected region
      axios
        .get(`${BASE_URL}/district/districts/region/${selectedRegion}`)
        .then((response) => {
          if (response.data.Status) {
            setDistricts(response.data.Result);
          } else {
            setError(response.data.Error);
          }
        })
        .catch((err) => {
          setError("Error fetching districts.");
          console.error(err);
        });
    } else {
      // Reset districts if no region is selected
      setDistricts([]);
    }
  }, [selectedRegion]);
  return (
    <section className="slider-area">
      <div id="welcome-slide" className="slide-controls owl-carousel">
        <div className="single-slide overlay-bg-2">
          <div className="slide-thumb shape-1">
            <img className="gl" src="img/slider/slide-1.jpg" alt="" />
            <div className="slide-content">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10 col-sm-12">
                    <div className="slide-content-area">
                      <div className="single-slide-content text-center">
                        <div className="content-text pb-5">
                          <h1>
                            Tabiat <span></span> Manzaralariga sayohat
                          </h1>
                          {/* <h2>
                        It's time for new
                        <strong>Escapes, Thrills</strong>
                        <span></span> and <strong>Experiences</strong>
                      </h2> */}
                        </div>
                        <div className="find-adventure-form text-center">
                          <form action="#">
                            <select
                              id="region"
                              value={selectedRegion}
                              onChange={(e) =>
                                setSelectedRegion(e.target.value)
                              }
                              className="form-control"
                            >
                              <option value="">Viloyatni tanlang</option>
                              {regions.map((region) => (
                                <option key={region.id} value={region.id}>
                                  {region.name}
                                </option>
                              ))}
                            </select>
                            <select
                              id="district"
                              value={selectedDistrict}
                              onChange={(e) =>
                                setSelectedDistrict(e.target.value)
                              }
                              className="form-control"
                              disabled={!selectedRegion}
                            >
                              <option value="">Tumanni tanlang</option>
                              {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                  {district.name}
                                </option>
                              ))}
                            </select>

                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={selectedMavsum}
                              onChange={(e) =>
                                setSelectedMavsum(e.target.value)
                              }
                            >
                              <option value="" disabled>
                                Mavsum tanlash
                              </option>
                              <option value="1">Qish</option>
                              <option value="2">Bahor</option>
                              <option value="3">Yoz</option>
                              <option value="4">Kuz</option>
                            </select>
                            <input
                              className="btn btn-theme"
                              type="submit"
                              value="Qidirish"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
