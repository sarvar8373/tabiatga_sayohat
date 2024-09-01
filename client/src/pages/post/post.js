import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/host/host";
import { HelmetProvider, Helmet } from "react-helmet-async";
export default function Post() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8); // Number of posts per page

  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts/posts`)
      .then((result) => {
        if (result.data.Status) {
          setPosts(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  // Calculate the posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate the number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Maskanlar</title>
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
                <h3>Maskanlar</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Maskanlar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-area pt-90">
        <div className="container">
          <div className="row">
            {currentPosts
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
                            __html: truncateText(post.text, 5),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="gane-pagination mt-30 text-center">
          <ul>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
              >
                <span onClick={() => paginate(index + 1)}>{index + 1}</span>
              </li>
            ))}
          </ul>
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
