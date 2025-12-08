import type { FC } from "react";
import { FaSpinner } from "react-icons/fa";

const PageLoader: FC = () => {
  return (
    <div className="h-[calc(100vh-200px)] flex justify-center items-center">
      <FaSpinner className="size-7 animate-spin text-yellow-55" />
    </div>
  );
};

export default PageLoader;
