import React from "react";
import HomeHeader from "../components/HomeHeader";
import Products from "../components/Products";

import Category from "./Category";

const Home = () => {
  return (
    <div>
      <section>
        <HomeHeader />
      </section>
      <div className="max-w-7xl mx-auto">
        <section>
          <Category />
        </section>
        <section>
          <Products />
        </section>
      </div>
    </div>
  );
};

export default Home;
