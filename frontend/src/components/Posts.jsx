import { useState } from "react";
import DemoImage from "../assests/assets/images/image1.jpg";
import PostItem from "./PostItem";

const DummyPosts = [
  {
    id: 1,
    thumbnail: DemoImage,
    category: "javascript",
    title: "JS",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, suscipit?",
    authorID: 1,
  },
  {
    id: 2,
    thumbnail: DemoImage,
    category: "python",
    title: "Python",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, suscipit?",
    authorID: 2,
  },
  {
    id: 3,
    thumbnail: DemoImage,
    category: "cpp",
    title: "C++",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, suscipit?",
    authorID: 3,
  },
];

const Posts = () => {
  const [posts, setPosts] = useState(DummyPosts);
  return (
    <div>
      <section>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            description={post.desc}
            thumbnail={post.thumbnail}
            category={post.category}
            title={post.title}
            authorID={post.authorID}
          />
        ))}
      </section>
    </div>
  );
};

export default Posts;
