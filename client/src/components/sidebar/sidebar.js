import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/host/host";
import { getPosts } from "../../http/postsApi";

export default function Sidebar() {
  const [posts, setPosts] = useState([]);

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
        <ul className="widget-catagories">
          <li>
            <input type="checkbox" /> Kemping <span>(110)</span>
          </li>
          <li>
            <input type="checkbox" /> Piyoda yurish <span>(52)</span>
          </li>
          <li>
            <input type="checkbox" /> Safarilar <span>(54)</span>
          </li>
          <li>
            <input type="checkbox" /> Velikda yurish <span>(22)</span>
          </li>
          <li>
            <input type="checkbox" /> Plyaj sayohatlari <span>(11)</span>
          </li>
          <li>
            <input type="checkbox" /> Serfinglar <span>(32)</span>
          </li>
        </ul>
      </div>
      <div className="sigle-adv-sidebar">
        <h4>
          Mashxur <span>Postlar</span>
        </h4>
        {posts.map((post) => (
          <div key={post.id} className="single-popular-post-wrap">
            <div className="popular-post-thumb" style={{ width: "80px" }}>
              <img
                src={`${BASE_URL}/uploads/${post.image}`}
                alt={post.title}
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div className="popular-post-content">
              <p>{post.date}</p>
              <Link to={`/posts/${post.id}`}>
                <h6>{post.title}</h6>
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
