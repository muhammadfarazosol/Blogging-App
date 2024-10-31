import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaImage, FaSpinner } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function EnhancedBlogCreator() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Please Select a category");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnail(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      console.log("Title:", title);
      console.log("Category:", category);
      console.log("Content:", description);
      setIsLoading(false);
      // Here you would typically send this data to your backend
    }, 2000);
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
      ["link", "image", "video"],
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
    "video",
  ];

  const POST_Categories = [
    "Please select a category",
    "Python",
    "Javascript",
    "Cpp",
    "Ruby",
    "Node JS",
    "Java",
    "Typescript",
    "PHP",
  ];

  return (
    // <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-indigo-100 shadow-2xl rounded-lg">
    //   <h1 className="text-4xl font-extrabold mb-8 text-center text-black">
    //     Create Your Masterpiece
    //   </h1>

    //   <form>
    //     {/* Image Upload */}
    //     <div className="mb-8">
    //       <label
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //         htmlFor="image"
    //       >
    //         Cover Image
    //       </label>
    //       <div className="flex items-center justify-center w-full">
    //         <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
    //           <div className="flex flex-col items-center justify-center pt-7">
    //             <FaImage className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
    //             <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
    //               Select a photo
    //             </p>
    //           </div>
    //           <input
    //             type="file"
    //             className="opacity-0"
    //             onChange={handleImageChange}
    //             // onChange={(e) => setCategory(e.target.value[0])}
    //           />
    //         </label>
    //       </div>
    //       {thumbnail && (
    //         <div className="mt-4 relative group">
    //           <img
    //             src={thumbnail}
    //             alt="Preview"
    //             className="max-h-48 w-full object-cover rounded-lg shadow-md"
    //           />
    //           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
    //             <p className="text-white text-lg font-semibold">Change Image</p>
    //           </div>
    //         </div>
    //       )}
    //     </div>

    //     {/* Title Input */}
    //     <div className="mb-8">
    //       <label
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //         htmlFor="title"
    //       >
    //         Title
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300 ease-in-out"
    //         id="title"
    //         type="text"
    //         placeholder="Enter your captivating title"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //       />
    //     </div>

    //     {/* Category Dropdown */}
    //     <div className="mb-8">
    //       <label
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //         htmlFor="category"
    //       >
    //         Category
    //       </label>
    //       <div className="relative">
    //         <select
    //           className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300 ease-in-out"
    //           id="category"
    //           name="category"
    //           value={category}
    //           onChange={(e) => setCategory(e.target.value)}
    //         >
    //           {POST_Categories.map((cat) => (
    //             <option key={cat}>{cat}</option>
    //           ))}
    //         </select>
    //         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    //           <svg
    //             className="fill-current h-4 w-4"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 20 20"
    //           >
    //             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    //           </svg>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Rich Text Editor */}
    //     <div className="mb-8">
    //       <label className="block text-gray-700 text-sm font-bold mb-2">
    //         Description
    //       </label>
    //       <ReactQuill
    //         theme="snow"
    //         value={description}
    //         onChange={setDescription}
    //         modules={modules}
    //         formats={formats}
    //         className="bg-white rounded-lg shadow-inner"
    //       />
    //     </div>

    //     {/* Create Button */}
    //     <div className="flex items-center justify-center">
    //       <button
    //         className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transform transition duration-300 ease-in-out ${
    //           isLoading
    //             ? "opacity-50 cursor-not-allowed"
    //             : "hover:scale-105 hover:shadow-lg"
    //         }`}
    //         type="submit"
    //         onClick={handleCreate}
    //         disabled={isLoading}
    //       >
    //         {isLoading ? (
    //           <FaSpinner className="animate-spin mr-2 inline-block" />
    //         ) : null}
    //         {isLoading ? "Creating..." : "Create Blog Post"}
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <>
      <section className="py-10">
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-50 to-indigo-100 text-black rounded-lg">
          <h1 className="text-4xl font-extrabold mb-8 text-center">
            Create Your Masterpiece
          </h1>

          <form>
            {/* Image Upload */}
            <div className="mb-8">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="image"
              >
                Cover Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-36 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg transition duration-300 ease-in-out cursor-pointer">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt="Preview"
                      className="h-full w-full object-fit rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-7">
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
                  {POST_Categories.map((cat) => (
                    <option key={cat}>{cat}</option>
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
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                className="bg-white rounded-lg shadow-inner text-gray-700"
              />
            </div>

            {/* Create Button */}
            <div className="flex items-center justify-center">
              <button
                className={`bg-black hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                onClick={handleCreate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2 inline-block" />
                    Creating...
                  </>
                ) : (
                  "Create Blog Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
