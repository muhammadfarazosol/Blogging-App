import { Frown } from "lucide-react";

export default function Component() {
  return (
    <div className="bg-[#c9dcf3] max-sm:mt-56 md:mt-20">
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <div>
          <Frown className="h-24 w-24 text-gray-800" strokeWidth={1.5} />
        </div>
        <p className="flex justify-center items-center font-extrabold pb-4 text-xl text-black">
          Sorry, No Blogs Available Yet
        </p>
      </div>
    </div>
  );
}
