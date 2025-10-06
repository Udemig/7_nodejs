import { FC, ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

const Field: FC<Props> = ({ label, children }) => {
  return (
    <fieldset>
      <label className="block text-sm mb-1">
        {label}
        <span className="text-red-500"> *</span>
      </label>

      {children}
    </fieldset>
  );
};

export default Field;
