import { Ban } from "lucide-react";

export default function Component() {
  return (
    <div className="bg-[#c9dcf3]">
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <div>
          <Ban className="h-24 w-24 text-gray-800" strokeWidth={1.5} />
        </div>
        <p className="flex justify-center items-center font-extrabold pb-4 text-2xl text-gray-800">
          No Post Yet, Comeback Later..
        </p>
      </div>
    </div>
  );
}
