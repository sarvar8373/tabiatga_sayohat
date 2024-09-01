import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { BASE_URL } from "../../api/host/host";
import { HelmetProvider, Helmet } from "react-helmet-async";
export default function Lakes() {
  const [posts, setPosts] = useState([]);
  const desiredCategoryName = "Ko'l"; // The category name you want to filter by
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4); // Number of posts per page

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Calculate the number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch all categories to find the category_id for the desired category
        const categoriesResponse = await axios.get(
          `${BASE_URL}/category/categories`
        );

        if (categoriesResponse.data.Status) {
          const categories = categoriesResponse.data.Result;
          const category = categories.find(
            (cat) => cat.name === desiredCategoryName
          );
          if (category) {
            // Fetch posts for the found category_id
            const postsResponse = await axios.get(`${BASE_URL}/posts/posts`, {
              params: { category_id: category.id },
            });

            if (postsResponse.data.Status) {
              setPosts(postsResponse.data.Result);
            } else {
              console.error(postsResponse.data.Error);
            }
          } else {
            console.error("Category not found");
          }
        } else {
          console.error(categoriesResponse.data.Error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, [desiredCategoryName]);
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Ko'llar</title>
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
                <h3>Ko'llar</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Ko'llar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-area pt-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              <div className="blog-top-bar">
                <form action="#" className="blog-select-form">
                  <select
                    className="form-select"
                    defaultValue="ss"
                    aria-label="Default select example"
                  >
                    <option selected>Narxi</option>
                    <option value="1">Qimmat</option>
                    <option value="2">Arzon</option>
                  </select>
                </form>
              </div>
              <div className="single-blog-post-wrap">
                {posts.length > 0 ? (
                  currentPosts
                    .filter((post) => post.status !== 0)
                    .map((post) => (
                      <div key={post.id} className="single-blog-post">
                        <div className="post-thumbnail">
                          {post.images && post.images.split(",")[0] && (
                            <img
                              src={`${BASE_URL}/uploads/${
                                post.images.split(",")[0]
                              }`}
                              alt={post.title}
                              style={{ width: "870px", height: "400px" }}
                            />
                          )}
                        </div>
                        <div className="single-post-content-thumb">
                          <div className="post-meta">
                            <span>
                              <i className="fal fa-clock"></i>
                              {new Date().toLocaleDateString()}
                            </span>
                            <span>
                              <i className="fal fa-user"></i>
                              {post.author_id}
                            </span>
                            <span>
                              <i className="fad fa-eye"></i>
                              12
                            </span>
                            <span>
                              <i className="fal fa-comments"></i>
                              {post.comments} Komentariyalar
                            </span>
                          </div>
                          <div className="entry-header">
                            <Link to={`/posts/${post.id}`}>
                              <h2 className="entry-title">{post.title}</h2>
                            </Link>
                          </div>
                          <div className="entry-content">
                            <p>{post.excerpt}</p>
                            <Link
                              to={`/posts/${post.id}`}
                              className="btn border-theme"
                            >
                              Batafsil
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No posts found in this category.</p>
                )}
              </div>
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
