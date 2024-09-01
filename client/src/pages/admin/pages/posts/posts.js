import React, { useCallback, useEffect, useState } from "react";
import PostEdit from "./postEdit"; // Import the new component
import { BASE_URL } from "../../../../api/host/host";
import SearchItem from "../../../../components/search-item/searchItem";
import debounce from "lodash/debounce";
import {
  deletePosts,
  getCategories,
  getPosts,
} from "../../../../http/postsApi";
import { getUsers } from "../../../../http/usersApi";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getPosts()
      .then((result) => {
        if (result.data.Status) {
          setPosts(result.data.Result);
          setFilteredPosts(result.data.Result); // Initially show all posts
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [editMode]);

  useEffect(() => {
    getCategories()
      .then((categoryResult) => {
        if (categoryResult.data.Status) {
          setCategories(categoryResult.data.Result);
        } else {
          alert(categoryResult.data.Error);
        }
      })
      .catch((err) => console.log(err));

    getUsers()
      .then((userResult) => {
        if (userResult.data.Status) {
          setAuthors(userResult.data.Result);
        } else {
          alert(userResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (postID) => {
    deletePosts(postID)
      .then((result) => {
        if (result.data.Status) {
          setPosts(posts.filter((p) => p.id !== postID));
          setFilteredPosts(filteredPosts.filter((p) => p.id !== postID));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (post) => {
    if (post) {
      setSelectedPost(post);
      setEditMode(true);
    }
  };

  const handleSearch = useCallback(() => {
    const titleSearchTerm = searchTerm.trim().toLowerCase();
    const categorySearchTerm = searchTerm1.trim().toLowerCase();
    const authorSearchTerm = searchTerm2.trim().toLowerCase();

    const filtered = posts.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(titleSearchTerm);

      const category = categories.find((cat) => cat.id === post.category_id);
      const matchesCategory = category
        ? category.name.toLowerCase().includes(categorySearchTerm)
        : true;

      const author = authors.find((auth) => auth.id === post.author_id);
      const matchesAuthor = author
        ? author.full_name.toLowerCase().includes(authorSearchTerm)
        : true;

      return matchesTitle && matchesCategory && matchesAuthor;
    });
    setFilteredPosts(filtered);
  }, [authors, categories, posts, searchTerm, searchTerm1, searchTerm2]);

  const handleSave = (updatedPost) => {
    if (updatedPost && updatedPost.id) {
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      setFilteredPosts(
        filteredPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
    }
    setEditMode(false);
  };
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      handleSearch();
    }, 300);
    debouncedSearch();
    // Cleanup function to cancel debounce on component unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [handleSearch]);
  return (
    <div className="container-fluid px-4">
      {editMode ? (
        <PostEdit
          post={selectedPost}
          categories={categories}
          authors={authors}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          <h2 className="mt-4">Postlar ro'yhati</h2>
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th className="text-light">ID</th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                    placeholder="Sarlavha"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm1}
                    setSearchTerm={setSearchTerm1}
                    handleSearch={handleSearch}
                    placeholder="Kategoriya"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm2}
                    setSearchTerm={setSearchTerm2}
                    handleSearch={handleSearch}
                    placeholder="Foydalanuvchi"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">Rasmi</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>
                    {categories.find(
                      (category) => category.id === post.category_id
                    )?.name || "Unknown Category"}
                  </td>
                  <td>
                    {authors.find((author) => author.id === post.author_id)
                      ?.full_name || "Unknown Author"}
                  </td>
                  <td className="d-flex justify-content-between">
                    {post.images && post.images.split(",")[0] && (
                      <img
                        src={`${BASE_URL}/uploads/${post.images.split(",")[0]}`}
                        alt={post.title}
                        width="100"
                        className="mx-20"
                        style={{ height: "69px", objectFit: "cover" }}
                      />
                    )}
                    <div>
                      <button
                        onClick={() => handleEdit(post)}
                        className="btn btn-warning mx-3"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn btn-danger"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </>
      )}
    </div>
  );
}
