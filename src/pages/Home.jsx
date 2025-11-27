import React from "react";
import HomeHeader from "../components/HomeHeader";
import Products from "../components/Products";
import Category from "./Category";
import ManFashion from "../components/categoryProduct/ManFashion";
import WomenFashion from "../components/categoryProduct/WomenFashion";
import Bags from "../components/categoryProduct/Bags";

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
        {/* <section>
          <Products />
        </section> */}
        <section>
          <Bags />
        </section>
        <section>
          <ManFashion />
        </section>
        <section>
          <WomenFashion />
        </section>
      </div>
    </div>
  );
};

export default Home;
