import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img from "../assets/kids.jpg";
import img2 from "../assets/accessories.jpg";
import img3 from "../assets/electronics.jpg";
import img4 from "../assets/man.jpg";
import img5 from "../assets/women.jpg";
import Button from "./Button";
import SecondaryButton from "./SecondaryButton";
import { Link } from "react-router";

const HomeHeader = () => {
  const slides = [
    {
      image: img,
      title: "Kids' Fashion Collection",
      text: "Cute and comfy outfits for your little ones.",
    },
    {
      image: img2,
      title: "Stylish Accessories",
      text: "Complete your look with the perfect accessories.",
    },
    {
      image: img3,
      title: "Latest Tech Gadgets",
      text: "Innovative gadgets to make life easier and fun.",
    },
    {
      image: img4,
      title: "Men's Fashion",
      text: "Trendy and comfortable clothing for men.",
    },
    {
      image: img5,
      title: "Women's Fashion",
      text: "Elegant and stylish outfits for every occasion.",
    },
  ];
  return (
    <div className="w-full ">
      {/* mt-[70px] navbar overlap fix (if navbar is fixed) */}

      <Carousel
        className=""
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={2500}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] object-cover"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Text + Buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {slide.title}
              </h1>

              <p className="mt-3 text-white text-lg md:text-xl drop-shadow">
                {slide.text}
              </p>

              {/* Responsive Buttons */}
              <Link
                to="/products"
                className="flex flex-col md:flex-row gap-4 mt-6 w-full max-w-xs md:max-w-sm mx-auto"
              >
                <Button text={" Shop Now"} />
                <button className="w-full md:w-auto px-3 sm:px-4 md:px-8 py-2 border border-white text-white rounded font-semibold hover:bg-primary hover:text-white transition hover:border-primary cursor-pointer">
                  View Collections
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeHeader;
