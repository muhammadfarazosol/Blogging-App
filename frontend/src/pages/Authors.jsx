import { useState } from "react";
import Avatar from "../assests/avatars/osolLogo.png";
import { Link } from "react-router-dom";

const authorsData = [
  {
    id: 1,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 10,
  },
  {
    id: 2,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 1,
  },
  {
    id: 3,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 5,
  },
  {
    id: 4,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 8,
  },
  {
    id: 5,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 4,
  },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);
  return (
    <div className="my-5">
      {authors.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map(({ id, avatar, name, posts }) => {
            return (
              <Link key={id} to={`/posts/users/${id}`}>
                <div className="w-full">
                  <div className="flex flex-col justify-center max-w-xs mx-auto bg-black shadow-xl rounded-xl p-5">
                    <div>
                      <img
                        className="w-16 mx-auto shadow-xl rounded-full"
                        src={avatar}
                        alt="Profile face"
                      />
                    </div>
                    <div className="text-center mt-5">
                      <p className="text-xl sm:text-2xl font-semibold text-white">
                        {name}
                      </p>
                      <p className="text-xs sm:text-base text-white pt-2 pb-4 px-5 w-auto inline-block border-b-2">
                        Post: {posts}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      ) : (
        <h2>No users found</h2>
      )}
    </div>
  );
};

export default Authors;
