import { ErrorMessage, Field } from "formik";
import type { FC } from "react";

interface Props {
  label: string;
  name: string;
  type: string;
}

const Input: FC<Props> = ({ label, name, type }) => {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="text-sm font-medium text-grey-70 mb-2 block"
      >
        {label}
      </label>

      <div className="mt-2">
        <Field
          id={name}
          name={name}
          type={type}
          as={type === "textarea" ? "textarea" : "input"}
          className={`block w-full rounded-xl bg-white/95 text-base px-4 py-3 text-black outline-none ring-1 ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-55/40 transition-all sm:text-sm/6 ${
            type === "text-area"
              ? "min-h-[200px] resize-none max-h-[600px]"
              : ""
          }`}
        />
      </div>

      <ErrorMessage
        name={name}
        component={"div"}
        className="text-red-400 absolute -bottom-6 text-sm"
      />
    </div>
  );
};

export default Input;
