import { notFound, redirect } from "next/navigation";
import ClientComponent from "./client-component";
import ServerComponent from "./server-component";

const About = () => {
  if ("kullanıcı admin değilse") {
    // redirect("/");
    notFound();
  }

  return (
    <div className="p-10 text-center my-20 border border-blue-500">
      <h1>Hakkımızda Sayfası</h1>

      <ClientComponent>
        <ServerComponent />
      </ClientComponent>

      <ul>
        <li>1 eleman</li>
        <li>2 eleman</li>
      </ul>

      <span className="server">Server Component (SSR)</span>
    </div>
  );
};

export default About;
