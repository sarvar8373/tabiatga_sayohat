import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import { BASE_URL } from "../../api/host/host";
import { HelmetProvider, Helmet } from "react-helmet-async";
import CustomCarousel from "../../components/carousel/carousel";

export default function SinglePost() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/post/${id}`);
        if (response.data.Status) {
          setPost(response.data.Result);
          fetchSurroundingPosts(id); // Fetch surrounding posts using the current ID
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Error fetching post data");
      } finally {
        setLoading(false);
      }
    };

    const fetchSurroundingPosts = async (currentPostId) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/posts/surrounding/${currentPostId}`
        );
        if (response.data.Status) {
          setPrevPost(response.data.Result.prevPost);
          setNextPost(response.data.Result.nextPost);
        }
      } catch (err) {
        console.log("Error fetching surrounding posts", err);
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
          <title>{post.title}</title>
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
                <h3>{post ? post.title : "Post"}</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>{post ? post.title : "Post"}</li>
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
              <div className="single-blog-post-wrap blog-details">
                <div className="single-blog-post">
                  <div className="post-thumbnail">
                    <CustomCarousel
                      images={post.images}
                      width="100%"
                      height="400px"
                      cover="cover"
                    />

                    {/* <div className="post-date">
                      <h4>21</h4>
                      <h3>Oktabr</h3>
                    </div> */}
                  </div>
                  <div className="single-post-coontent-top">
                    <div className="post-meta">
                      <span>
                        <i className="fal fa-comments"></i>12
                      </span>
                      <span>
                        <i className="fal fa-eye"></i>114
                      </span>
                      <span>
                        <i className="fal fa-thumbs-up"></i>320 Likes
                      </span>
                      <span>
                        <i className="fad fa-share-alt"></i>Share
                      </span>
                    </div>
                    <div className="entry-header">
                      <h2 className="entry-title">{post?.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="single-post-content-thumb">
                  <div className="entry-content">
                    <div
                      dangerouslySetInnerHTML={{ __html: post?.text || "" }}
                    />
                    <div className="quote-single">
                      <h2>{post?.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="next-prev-post-wrap">
                  <div className="post-np prev-post">
                    {prevPost ? (
                      <>
                        <p>Oldingi xabar:</p>
                        <Link to={`/posts/${prevPost.id}`}>
                          <h5>{prevPost.title}</h5>
                        </Link>
                      </>
                    ) : (
                      <p>Oldingi xabar mavjud emas</p>
                    )}
                  </div>
                  <div className="post-np next-post">
                    {nextPost ? (
                      <>
                        <p>Keyingi xabar:</p>
                        <Link to={`/posts/${nextPost.id}`}>
                          <h5>{nextPost.title}</h5>
                        </Link>
                      </>
                    ) : (
                      <p>Keyingi xabar mavjud emas</p>
                    )}
                  </div>
                </div>
                <div className="feedback-comments-wrap">
                  <div className="feedback">
                    <h5>Foydalanuvchilarning fikr-mulohazalari</h5>
                    <h4>Odamlarning fikrlari</h4>
                    <div className="user-comments-wrap">
                      <div className="user-thumb">
                        <img
                          src="/img/guide/1.png"
                          alt=""
                          width={73}
                          height={73}
                        />
                      </div>
                      <div className="user-content">
                        <p className="name">Sarvar</p>
                        <p className="date">14.08.2024</p>
                        <p className="comments">Juda zo'r daxshat</p>
                      </div>
                      <a className="reply">
                        Javob qaytarish
                        <i className="far fa-long-arrow-alt-right"></i>
                      </a>
                    </div>
                    <div className="user-comments-wrap">
                      <div className="user-thumb">
                        <img
                          src="/img/guide/1.png"
                          alt=""
                          width={73}
                          height={73}
                        />
                      </div>
                      <div className="user-content">
                        <p className="name">Jahongir</p>
                        <p className="date">13.08.2024</p>
                        <p className="comments">Menga juda yoqdi </p>
                      </div>
                      <a className="reply">
                        Javob qaytarish
                        <i className="far fa-long-arrow-alt-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="user-comments">
                    <h5>Fikrlarga javob berish</h5>
                    <h4>Izoh qoldiring</h4>

                    <form className="user-reply">
                      <div className="left-reply">
                        <div className="single-field">
                          <input
                            type="text"
                            className="form-control"
                            id="usr"
                            placeholder="FIO"
                          />
                        </div>
                        <div className="single-field">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Pochta"
                          />
                        </div>
                        <button
                          className="btn btn-theme-dark mb-30"
                          type="submit"
                        >
                          Yuborish
                        </button>
                      </div>
                      <div className="right-rply">
                        <div className="single-field">
                          <textarea
                            className="form-control"
                            rows="5"
                            id="comment"
                            placeholder="Xarbar yozing"
                          ></textarea>
                        </div>
                      </div>
                    </form>
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
      </div>
      <Footer />
    </div>
  );
}
