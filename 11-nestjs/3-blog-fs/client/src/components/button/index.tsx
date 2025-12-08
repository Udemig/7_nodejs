import type { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  to?: string;
  designs?: string;
}

const Button: FC<Props> = ({ text, to, designs }) => {
  return (
    <Link
      to={to || "/"}
      className={`${designs} flex items-center gap-3 border bg-white/5 backdrop-blur-sm border-white/10 px-5 py-2.5 rounded-xl hover:bg-white/10 hover:border-yellow-55/30 transition-all duration-300 group w-fit`}
    >
      <span className="whitespace-nowrap font-medium">{text}</span>
      <FaArrowRight className="text-yellow-55 rotate-310 group-hover:rotate-360 group-hover:scale-110 transition-all duration-300" />
    </Link>
  );
};

export default Button;
