import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaImage, FaSpinner } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Please select a category");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const { id } = useParams();

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const APP_ASSESTS_URL = import.meta.env.VITE_APP_ASSESTS_URL;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png"];
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      toast.error("File must be in JPEG or PNG");
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast.error("File size should not exceed 5 MB");
      return;
    }
    setThumbnail(file);
    setError("");
    // if (file) {
    //   setThumbnail(file);
    // }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    // "video",
  ];

  const POST_Categories = [
    "Cpp",
    "Javascript",
    "Python",
    "Ruby",
    "Nodejs",
    "Java",
    "Typescript",
    "PHP",
  ];

  useEffect(() => {
    setIsLoading(true);
    const getPost = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setThumbnailURL(response.data.thumbnail);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!title || !category || !description) {
      setIsLoading(false);
      toast.error("Please fill all the fields");
      return;
    }

    if (title.length <= 3 || title.length > 200) {
      setIsLoading(false);
      if (title.length <= 3) {
        toast.error("Title must be greater than 3 characters");
      } else {
        toast.error("Title must not exceed 200 characters");
      }
      return;
    }

    if (category === "Please select a category") {
      setIsLoading(false);
      toast.error("Please select a valid category");
      return;
    }

    if (description.length <= 3500) {
      setIsLoading(false);
      if (description.length <= 3500) {
        toast.error("Description must be greater than 3500 characters");
      } else {
        toast.error("Description must not exceed 20000 characters");
      }
      return;
    }

    const postData = new FormData();
    postData.append("title", title);
    postData.append("category", category);
    postData.append("description", description);
    if (thumbnail) {
      postData.append("thumbnail", thumbnail);
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/posts/${id}`,
        postData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Blog post updated successfully");
        navigate(`/posts/${id}`);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while creating the post."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-[#c9dcf3] pt-32">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="py-10 bg-[#c9dcf3]">
        <div className="max-w-2xl mx-auto p-8 bg-[#e1ebfa] text-black rounded-lg">
          {/* {error && <p className="text-red-600 text-sm mb-4">{error}</p>} */}
          <h1 className="text-4xl font-extrabold mb-8 text-center">
            Edit Your Masterpiece
          </h1>

          <form onSubmit={editPost}>
            {/* Image Upload */}
            <div className="mb-8">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="image"
              >
                Cover Image
              </label>
              <div className="flex items-center justify-center h-[220px] w-full bg-white">
                <label className="flex flex-col w-full h-[220px] border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg transition duration-300 ease-in-out cursor-pointer">
                  {thumbnail ? (
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="Selected Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : thumbnailURL ? (
                    <img
                      src={`${APP_ASSESTS_URL}/uploads/${thumbnailURL}`}
                      alt="Existing Thumbnail"
                      className="h-full w-full object-fit rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-[78px]">
                      <FaImage className="w-8 h-8 text-gray-400" />
                      <p className="pt-1 text-sm text-gray-400">
                        Select a photo
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {/* Title Input */}
            <div className="mb-8">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300 ease-in-out"
                id="title"
                type="text"
                placeholder="Enter your captivating title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category Dropdown */}
            <div className="mb-8">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300 ease-in-out"
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option disabled>Please select a category</option>
                  {POST_Categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="mb-8">
              <label className="block text-black text-sm font-bold mb-2">
                Description
              </label>
              {/* <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                className="bg-white rounded-lg shadow-inner text-gray-700"
              /> */}
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                className="bg-white rounded-lg shadow-inner text-gray-700 mb-20 custom-scrollbar"
                style={{
                  height: "300px",
                }}
              />
              <style>
                {`
  .ql-editor {
    max-height: 400px;
    background: white;         
    overflow-y: auto;          
  }

  .ql-editor img {
  display: block;            
  margin: 0 auto;            
  max-width: 1000px;         
  max-height: 300px;         
  object-fit: contain;       
}

`}
              </style>
            </div>

            {/* Create Button */}
            <div className="flex items-center justify-center">
              <button
                className={`bg-black max-sm:mt-10 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2 inline-block" />
                    Editing...
                  </>
                ) : (
                  "Edit Blog Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
