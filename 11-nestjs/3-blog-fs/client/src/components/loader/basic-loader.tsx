import type { FC } from "react";

const BasicLoader: FC = () => {
  return (
    <div className="flex justify-center items-center h-full py-[50px]">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-yellow-55 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-55 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-55 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
};

export default BasicLoader;
