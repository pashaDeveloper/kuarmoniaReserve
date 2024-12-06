import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import LoadingIndicator from "@/components/shared/loading/LoadingIndicator";

const Main = ({ children }) => {
  return (
    <>
      <LoadingIndicator />

      <Navbar />
      {children}
      <a
        href={`https://wa.me/905433575933?text=${encodeURIComponent(
          `سلام! من از طریق وب‌سایت شما تماس می‌گیرم`
        )}`}
        title="ارتباط از طریث واتس آپ"
        className="floating flex justify-center items-center"
        target="_blank"
      >
        <FaWhatsapp className="fab fa-whatsapp" />
      </a>

      <Footer />
    </>
  );
};

export default Main;
