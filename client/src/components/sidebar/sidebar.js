import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/host/host";
import { getPosts } from "../../http/postsApi";
import { getTourService } from "../../http/tourServices";

export default function Sidebar() {
  const [posts, setPosts] = useState([]);
  const [tourServices, setTourServices] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        if (response.data.Status) {
          const postsArray = Array.isArray(response.data.Result)
            ? response.data.Result
            : [];
          const lastFourPosts = postsArray.slice(-4);
          setPosts(lastFourPosts);
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  useEffect(() => {
    getTourService()
      .then((response) => {
        if (response.data.Status) {
          setTourServices(response.data.Result);
        } else {
          setError(response.data.Error);
        }
      })
      .catch((err) => {
        setError("Xatolik yuz berdi faoliyat turida.");
        console.error(err);
      });
  }, []);

  return (
    <div className="advanture-sidebar">
      <form className="blog-shearch-form" action="/">
        <input className="form-control" placeholder="Qidiruv" type="text" />
        <button className="submit" type="submit">
          <i className="fal fa-search"></i>
        </button>
      </form>
      <div className="sigle-adv-sidebar">
        <h4>
          Kategoriyani <span>Tanlang</span>
        </h4>
        <ul
          className="widget-catagories"
          style={{ width: "100%", height: "300px", overflow: "auto" }}
        >
          {tourServices.map((c, index) => (
            <li key={c.id}>
              <input type="checkbox" />
              {c.name} <span>(110)</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sigle-adv-sidebar">
        <h4>
          Mashxur <span>Postlar</span>
        </h4>
        {posts.map((post) => (
          <div key={post.id} className="single-popular-post-wrap">
            <div className="popular-post-thumb" style={{ width: "80px" }}>
              {post.images && post.images.split(",")[0] && (
                <img
                  src={`${BASE_URL}/uploads/${post.images.split(",")[0]}`}
                  alt={post.title}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              )}
            </div>
            <div className="popular-post-content">
              <p>{post.date}</p>
              <Link to={`/posts/${post.id}`}>
                <h6 className="sidebar-post">{post.title}</h6>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="sigle-adv-sidebar">
        <h4>
          Blog <span>Archives</span>
        </h4>
        <form action="/" className="blog-sidebar-select">
          <select className="form-select" aria-label="Default select example">
            <option selected="">Select Monthy</option>
            <option value="1">One</option>
            <option value="2">Two</option>
          </select>
        </form>
      </div> */}
      <div className="sigle-adv-sidebar">
        <h4>
          Faoliyatlarni <span>Tanlang</span>
        </h4>
        <ul className="widget-activities">
          <li>
            <a href="/">
              <img src="img/icon/a1.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="img/icon/a2.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="img/icon/a3.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="img/icon/a4.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="img/icon/a5.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="img/icon/a6.png" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
