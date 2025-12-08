import type { FC } from "react";
import Hero from "./hero";
import Ad from "./ad";
import List from "./list";

const Home: FC = () => {
  return (
    <div>
      <Hero />

      <Ad />

      <List />
    </div>
  );
};

export default Home;
