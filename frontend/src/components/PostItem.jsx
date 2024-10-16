const PostItem = ({
  postID,
  category,
  title,
  description,
  authorID,
  thumbnail,
}) => {
  return (
    <div className="bg-gray-100 px-2 py-10">
      <article className="mx-auto my-10 flex max-w-md flex-col rounded-2xl bg-white shadow overflow-hidden">
        <div className="w-full">
          <img
            className="w-full h-auto object-cover"
            src={thumbnail}
            alt={title}
          />
        </div>
        <div className="p-4 sm:p-6">
          <a
            href="#"
            className="mb-4 block text-2xl font-medium text-gray-700 hover:underline"
          >
            {title}
          </a>
          <p className="mb-6 text-gray-500">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="/placeholder.svg?height=40&width=40"
                alt="Johanson Levinsiki"
              />
              <div className="ml-4">
                <strong className="block font-medium text-gray-700">
                  Johanson Levinsiki
                </strong>
                <span className="text-sm text-gray-400">Jun 26, 2022</span>
              </div>
            </div>
            <button className="ml-4 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Python
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
