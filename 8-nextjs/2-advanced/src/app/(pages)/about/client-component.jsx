"use client";

const ClientComponent = ({ children }) => {
  console.log("ClientComponent render oldu");

  return (
    <div className="border border-red-500 p-10">
      <h1>Client Component</h1>

      {children}
    </div>
  );
};

export default ClientComponent;
