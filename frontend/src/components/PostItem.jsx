import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  id,
  category,
  title,
  description,
  authorID,
  thumbnail,
}) => {
  const shortDescription =
    description.length > 70 ? description.substr(0, 70) + "..." : description;
  const shortTitle = title.length > 25 ? title.substr(0, 25) + "..." : title;
  return (
    <div className=" px-5 py-10">
      <article className="mx-auto flex max-w-md flex-col rounded-2xl bg-white shadow overflow-hidden">
        {/* image div */}
        <div className="w-full">
          <img
            className="w-full h-[220px] object-fit"
            src={thumbnail}
            alt={title}
          />
        </div>
        <div className="p-4 sm:p-6">
          {/* title */}
          <Link to={`/posts/${id}`}>
            <h3 className="mb-4 block text-2xl font-medium text-gray-700 hover:underline">
              {shortTitle}
            </h3>
          </Link>
          <p className="mb-6 text-gray-500">{shortDescription}</p>
          <div className="flex items-center justify-between">
            {/* Author pic and name and time div */}
            <PostAuthor />
            {/* Category div */}
            <button className="ml-4 px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <Link to={`/posts/categories/${category}`}>{category}</Link>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
