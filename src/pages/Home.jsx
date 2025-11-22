import React from "react";
import HomeHeader from "../components/HomeHeader";
import Products from "../components/Products";
import CategoryCard from "./../components/CategoryCard";

const Home = () => {
  return (
    <div>
      <section>
        <HomeHeader />
      </section>
      <div className="max-w-7xl mx-auto">
        <section>
          <Products />
        </section>
        <section>
          <CategoryCard />
        </section>
      </div>
    </div>
  );
};

export default Home;
