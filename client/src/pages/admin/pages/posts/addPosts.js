import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { getCategories, postPosts } from "../../../../http/postsApi";
import { getUsers } from "../../../../http/usersApi";

export default function AddPosts() {
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [posts, setPosts] = useState({
    title: "",
    text: "",
    category_id: "",
    author_id: "",
  });

  useEffect(() => {
    getCategories()
      .then((categoryResult) => {
        if (categoryResult.data.Status) {
          setCategory(categoryResult.data.Result);
        } else {
          alert(categoryResult.data.Error);
        }
      })
      .catch((err) => console.log(err));

    getUsers()
      .then((userResult) => {
        if (userResult.data.Status) {
          setUsers(userResult.data.Result);
        } else {
          alert(userResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", posts.title);
    formData.append("text", editorValue);
    formData.append("category_id", posts.category_id);
    formData.append("author_id", posts.author_id);

    // Append each file individually
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const result = await postPosts(formData);

      if (result.data.Status) {
        setStatus("success");
        setMessage("Post muvafaqiyatli yaratildi");
        setPosts({
          title: "",
          text: "",
          category_id: "",
          author_id: "",
        });
        setEditorValue("");
        setImages([]);
      } else {
        setStatus("danger");
        setMessage(result.data.Error);
      }
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response ? error.response.data : error.message
      );
      setStatus("danger");
      setMessage("Error occurred while creating post.");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Post qo'shish</h2>
      {message && (
        <div className={`alert alert-${status}`} role="alert">
          {message}
        </div>
      )}
      <div className="login-form">
        <form
          className="gane-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-left">
            <div className="single-field">
              <label htmlFor="title" className="my-3">
                Sarlavha
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Sarlavha"
                value={posts.title}
                onChange={(e) => setPosts({ ...posts, title: e.target.value })}
                required
              />
            </div>
            <div className="single-field mb-5">
              <label htmlFor="title" className="my-3">
                Ma'lumot
              </label>
              <ReactQuill
                theme="snow"
                value={editorValue}
                onChange={(value) => setEditorValue(value)}
                style={{ height: "300px", background: "white" }}
              />
            </div>
            <div className="single-field">
              <label className="form-label my-3">Rasm qo'yish</label>
              <input
                className="form-control"
                type="file"
                name="images"
                id="formFile"
                onChange={handleImageChange}
                multiple // Allow multiple file uploads
              />
            </div>
            <div className="single-field">
              <label htmlFor="category" className="my-3">
                Kategoriya
              </label>
              <select
                className="form-select mb-4"
                aria-label="Default select example"
                value={posts.category_id}
                onChange={(e) =>
                  setPosts({ ...posts, category_id: e.target.value })
                }
              >
                <option value="">Kategoriya tanlash</option>
                {category.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <label htmlFor="author" className="form-label">
                Foydalanuvchi
              </label>
              <select
                className="form-select mb-4"
                aria-label="Default select example"
                value={posts.author_id}
                onChange={(e) =>
                  setPosts({ ...posts, author_id: e.target.value })
                }
              >
                <option value="">Foydalanivchi tanlash</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.full_name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-success px-3 mx-3" type="submit">
              Yaratish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
