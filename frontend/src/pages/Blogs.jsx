import Posts from "../components/Posts";
import Filter from "../components/Filter";

const Blogs = () => {
  return (
    <div className="bg-[#c9dcf3]">
      <Filter />
      {/* <h1 className="flex items-center justify-center text-3xl font-bold text-black"> */}
      <h1 className="blogs-heading">Explore Our Blogs</h1>
      <Posts />
    </div>
  );
};

export default Blogs;
