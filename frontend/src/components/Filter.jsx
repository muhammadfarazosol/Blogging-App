import { Link } from "react-router-dom";

const Filter = () => {
  return (
    <div>
      <ul className="flex flex-row justify-around space-x-3 my-3">
        <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
          <Link to="/post/categories/cpp">C++</Link>
        </li>
        <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
          <Link to="/post/categories/javascript">Javascript</Link>
        </li>
        <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
          <Link to="/post/categories/python">Python</Link>
        </li>
        <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
          <Link to="/post/categories/Ruby">Ruby</Link>
        </li>
        <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
          <Link to="/post/categories/nodejs">Node JS</Link>
        </li>
        <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
          <Link to="/post/categories/java">Java</Link>
        </li>
        <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
          <Link to="/post/categories/typescript">Typescript</Link>
        </li>
        <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
          <Link to="/post/categories/php">PHP</Link>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
