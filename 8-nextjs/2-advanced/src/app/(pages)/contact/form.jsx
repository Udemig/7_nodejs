"use client";

import Info from "./info";

const Form = () => {
  console.log("Form render oldu");

  return (
    <div className="p-10 border border-red-500">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setText("Selamlar");
        }}
      >
        <input type="text" className="border my-1" />
        <button>Gönder</button>
      </form>

      {/* Normalde Info component'ı server componentdır ama
        * Client component olan form içerisinde 
        kullanıldığı için Info'da client olur
        */}
      <Info />

      <span className="client">Client Component (CSR)</span>
    </div>
  );
};

export default Form;
