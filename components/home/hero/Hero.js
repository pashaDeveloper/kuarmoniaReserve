import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import Container from "@/components/shared/container/Container";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useGetClientSlidesQuery } from "@/services/slide/slideApi";
import { useEffect, useState } from "react";

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 md:right-3 lg:right-8 shadow-lg rounded-full bg-white/80 p-4 drop-shadow-lg text-[0.8rem] md:text-[1.8rem] transform -translate-y-1/2 cursor-pointer z-10"
    onClick={onClick}
  >
    <HiOutlineChevronRight />
  </div>
);

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 md:left-3 lg:left-8 shadow-lg rounded-full bg-white/80 p-4 drop-shadow-lg text-[0.8rem] md:text-[1.8rem] transform -translate-y-1/2 cursor-pointer z-10"
    onClick={onClick}
  >
    <HiOutlineChevronLeft />
  </div>
);
const Hero = () => {
  const { data, isLoading, error } = useGetClientSlidesQuery();
  const slides = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading slides: {error.message}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <section
      className="bg-no-repeat h-2/3 bg-cover bg-bottom"
      style={{
        backgroundImage: "url(/assets/home-page/banner/bannerBg.svg)",
      }}
    >
      <Container>
        <div className="relative h-1/2 max-w-screen overflow-hidden text-black">
          <Slider {...settings}>
            {slides.map((slideContent) => (
              <Slide
                key={slideContent.slideId}
                {...slideContent}
                url={slideContent.url || "/"} // Ensure a valid URL is passed
              />
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};


export default Hero;
