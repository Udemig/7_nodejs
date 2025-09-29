import { FC } from "react";

const Statistics: FC = () => {
  return (
    <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4 px-6 bg-zinc-900 border-b border-zinc-800">
      <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg">
        <p className="text-2xl font-bold">2</p>
        <p className="text-xs text-blue-400/70">Aktif Ticket</p>
      </div>
      <div className="bg-blue-900/20 text-green-400 p-3 rounded-lg">
        <p className="text-2xl font-bold">2</p>
        <p className="text-xs text-green-400/70">Çözüldü</p>
      </div>
      <div className="bg-blue-900/20 text-yellow-400 p-3 rounded-lg max-lg:hidden">
        <p className="text-2xl font-bold">2</p>
        <p className="text-xs text-yellow-400/70">Beklemede</p>
      </div>
      <div className="bg-blue-900/20 text-purple-400 p-3 rounded-lg max-lg:hidden">
        <p className="text-2xl font-bold">2</p>
        <p className="text-xs text-purple-400/70">Ort. Öncelik</p>
      </div>
    </div>
  );
};

export default Statistics;
