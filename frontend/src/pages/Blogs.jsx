import Posts from "../components/Posts";
import Filter from "../components/Filter";

const Blogs = () => {
  return (
    <div>
      <Filter />
      <h1 className="flex items-center justify-center text-3xl font-bold text-white">
        Blogs
      </h1>
      <Posts />
    </div>
  );
};

export default Blogs;
