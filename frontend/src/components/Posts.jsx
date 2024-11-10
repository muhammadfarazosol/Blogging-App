import PostItem from "./PostItem";

const Posts = ({ posts }) => {
  return (
    <div className="bg-[#c9dcf3]">
      {posts.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostItem
              id={post._id}
              key={post._id}
              description={post.description}
              thumbnail={post.thumbnail}
              category={post.category}
              title={post.title}
              authorID={post.creator}
              createdAt={post.createdAt}
            />
          ))}
        </section>
      ) : (
        <h2 className="flex justify-center items-center font-bold text-2xl my-32 text-white">
          No posts found
        </h2>
      )}
    </div>
  );
};

export default Posts;
