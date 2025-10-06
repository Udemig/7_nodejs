import { LoaderCircle } from "lucide-react";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="my-40 flex justify-center items-center">
      <LoaderCircle className="text-blue-500 size-7 animate-spin" />
    </div>
  );
};

export default Loading;
