import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { putPost } from "../../../../http/postsApi";
import { BASE_URL } from "../../../../api/host/host";

export default function PostEdit({
  post,
  categories,
  authors,
  onSave,
  onCancel,
}) {
  const [editPost, setEditPost] = useState(post);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (post) {
      setEditPost(post);
      if (post.images) {
        const imageArray = Array.isArray(post.images)
          ? post.images
          : post.images.split(",");
        setImagePreviews(imageArray.map((img) => `${BASE_URL}/uploads/${img}`));
      } else {
        setImagePreviews([]);
      }
    }
  }, [post]);

  const handleUpdate = () => {
    if (!editPost || !editPost.id) {
      alert("Post data is missing or incorrect.");
      return;
    }

    const formData = new FormData();
    formData.append("title", editPost.title);
    formData.append("text", editPost.text);
    formData.append("category_id", editPost.category_id);
    formData.append("author_id", editPost.author_id);

    if (editPost.images instanceof FileList) {
      Array.from(editPost.images).forEach((file) => {
        formData.append("images", file);
      });
    } else if (Array.isArray(editPost.images)) {
      editPost.images.forEach((file, index) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    }

    putPost(editPost.id, formData)
      .then((result) => {
        if (result.data.Status) {
          onSave(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    const files = e.target.files; // FileList object
    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setEditPost({
        ...editPost,
        images: files,
      });
      setImagePreviews(newImages.map((img) => img.preview));
    }
  };

  return (
    <div>
      <h3>Tahrirlash</h3>
      <form>
        <div className="form-group">
          <label htmlFor="title">Sarlavha</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={editPost.title}
            onChange={(e) =>
              setEditPost({ ...editPost, title: e.target.value })
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="text" className="my-2">
            Ma'lumot
          </label>
          <ReactQuill
            theme="snow"
            id="text"
            value={editPost.text}
            onChange={(content) => setEditPost({ ...editPost, text: content })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="category" className="my-2">
            Kategoriya
          </label>
          <select
            id="category"
            className="form-control"
            value={editPost.category_id}
            onChange={(e) =>
              setEditPost({ ...editPost, category_id: e.target.value })
            }
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-3">
          <label htmlFor="author" className="my-2">
            Foydalanuvchi
          </label>
          <select
            id="author"
            className="form-control"
            value={editPost.author_id}
            onChange={(e) =>
              setEditPost({ ...editPost, author_id: e.target.value })
            }
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.full_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-3">
          <label htmlFor="image" className="my-2">
            Rasm
          </label>
          <input
            type="file"
            id="images"
            className="form-control"
            multiple
            onChange={handleImageChange}
          />
          {imagePreviews.length > 0 && (
            <div className="image-previews mt-3">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  width="100"
                  className="mx-2"
                />
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary my-3 mx-3"
          onClick={handleUpdate}
        >
          Yangilash
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2 my-3"
          onClick={onCancel}
        >
          Ortga
        </button>
      </form>
    </div>
  );
}
