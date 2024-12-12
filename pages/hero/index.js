import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";
import { sliderContent } from "./slider";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import Container from "@/components/shared/container/Container";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 md:right-3 lg:right-8 shadow-lg rounded-full bg-palette-card/80 p-1 drop-shadow-lg text-[0.8rem] md:text-[1.8rem] transform -translate-y-1/2 cursor-pointer z-10"
    onClick={onClick}
  >
    <HiOutlineChevronRight />
  </div>
);

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 md:left-3 lg:left-8 shadow-lg rounded-full bg-palette-card/80 p-1 drop-shadow-lg text-[0.8rem] md:text-[1.8rem] transform -translate-y-1/2 cursor-pointer z-10"
    onClick={onClick}
  >
    <HiOutlineChevronLeft />
  </div>
);

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <section
    className="py-12 bg-no-repeat bg-cover bg-bottom"
    style={{
      backgroundImage: "url(/assets/home-page/banner/bannerBg.svg)",
    }}
  >
    <Container>
      <div className="relative h-screen max-w-screen overflow-hidden text-black">
        <Slider {...settings}>
          {sliderContent.map((slideContent) => (
            <Slide key={slideContent.ID} {...slideContent} />
          ))}
        </Slider>
      </div>
    </Container>
    </section>

  );
};

export default Hero;
