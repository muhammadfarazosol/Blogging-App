import { MdEdit, MdDeleteSweep } from "react-icons/md";
import PostAuthor from "../components/PostAuthor";
import BlogImage from "../assests/assets/images/image1.jpg";

const PostDetail = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* White container */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Author and Buttons */}
        <div className="flex justify-between items-center mb-8">
          <PostAuthor />
          <div className="flex space-x-2">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
              <MdEdit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
              <MdDeleteSweep className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src={BlogImage}
            alt="Blog post cover"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          The Art of Crafting Perfect Coffee
        </h1>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Coffee, the aromatic elixir that fuels millions worldwide, is more
            than just a beverage—it's an art form. From the careful selection of
            beans to the precise brewing techniques, every step in the
            coffee-making process contributes to the final, delightful cup.
          </p>

          <h2 className="text-2xl font-semibold my-2">The Bean Selection</h2>
          <p>
            The journey begins with choosing the right beans. Whether you prefer
            the bright acidity of Ethiopian Yirgacheffe or the chocolatey notes
            of Brazilian Santos, each origin offers a unique flavor profile.
            Single-origin beans showcase the terroir of their growth, while
            carefully crafted blends can create complex and balanced flavors.
          </p>

          <h2 className="text-2xl font-semibold my-2">The Roast</h2>
          <p>
            Roasting is where science meets art. The transformation of green
            coffee beans into the aromatic brown beans we know is a delicate
            process. Light roasts preserve the bean's original flavors, medium
            roasts offer a balanced profile, and dark roasts bring out bold,
            caramelized notes.
          </p>

          <h2 className="text-2xl font-semibold my-2">The Grind</h2>
          <p>
            Grinding your beans just before brewing ensures maximum freshness.
            The grind size should match your brewing method: coarse for French
            press, medium for drip coffee, and fine for espresso. Consistency in
            grind size is key to even extraction.
          </p>

          <h2 className="text-2xl font-semibold my-2">The Brew</h2>
          <p>
            Finally, the brewing method ties everything together. Whether you
            prefer the clean taste of pour-over, the full body of French press,
            or the intensity of espresso, each method has its own nuances. Water
            temperature, brew time, and coffee-to-water ratio all play crucial
            roles in extracting the perfect flavors.
          </p>

          <p>
            Mastering the art of coffee-making is a journey of experimentation
            and discovery. With practice and attention to detail, you can craft
            the perfect cup that satisfies your unique taste preferences. So,
            the next time you brew your coffee, take a moment to appreciate the
            artistry in your cup.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
