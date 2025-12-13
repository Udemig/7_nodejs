import type { FC } from "react";
import Form from "./form";
import List from "./list";

const Comments: FC = () => {
  return (
    <div className="padding-x py-8 pb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-yellow-55 rounded-full"></div>
        <h2 className="text-xl font-semibold">Yorumlar</h2>
      </div>

      <Form />

      <List />
    </div>
  );
};

export default Comments;
