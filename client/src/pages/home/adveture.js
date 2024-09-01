import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/host/host";

// Utility function to truncate text to a specific number of words
const truncateText = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default function Adventure() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/posts`);
        if (response.data.Status) {
          const postsArray = Array.isArray(response.data.Result)
            ? response.data.Result
            : [];
          const lastFourPosts = postsArray.slice(-8);
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
    <div className="adventure-area pb-90 pt-50">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-8">
            <div className="section-title text-center">
              <p className="title">Qiziqarli sayohat</p>
              <h2>
                Eng zo'r sayohatlar <span></span> shu yerda
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {posts
            .filter((post) => post.status !== 0)
            .map((post) => (
              <div key={post.id} className="col-lg-3 col-sm-6">
                <div className="single-adventure">
                  {post.images && post.images.split(",")[0] && (
                    <img
                      src={`${BASE_URL}/uploads/${post.images.split(",")[0]}`}
                      alt={post.title}
                    />
                  )}
                  <div className="adventure-content">
                    <Link to={`/posts/${post.id}`}>
                      <h5>{post.title}</h5>
                    </Link>
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncateText(post.text, 7),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
