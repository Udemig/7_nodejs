import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div>
      <FaSpinner className="text-lg text-center text-blue-500 animate-spin" />
    </div>
  );
};

export default Loading;
