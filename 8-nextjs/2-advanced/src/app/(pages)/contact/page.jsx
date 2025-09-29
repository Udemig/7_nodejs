import Form from "./form";

const Contact = () => {
  console.log("Contact render oldu");

  return (
    <div className="p-10 text-center my-20 border border-blue-500 flex flex-col gap-10">
      <h1>İletişim Sayfası</h1>

      <hr />

      {/* Server component içerisinde client component kullndık bu sayede bütün sayfayı client yapmak zorunda kalmadık */}
      <Form />

      <hr />

      <ul>
        <li>1 eleman</li>
        <li>2 eleman</li>
        <li>3 eleman</li>
      </ul>

      <span className="server">Server Component (SSR)</span>
    </div>
  );
};

export default Contact;
