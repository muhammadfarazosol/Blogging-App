import PostItem from "./PostItem";
import NoPostFound from "../components/NoPostFound";

const Posts = ({ posts }) => {
  return (
    <div className="bg-[#c9dcf3]">
      {posts.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
        <div>
          <NoPostFound />
        </div>
      )}
    </div>
  );
};

export default Posts;
