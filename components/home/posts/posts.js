

// import Image from "next/image";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";
import PostCard from "./PostCard";

const posts = () => {
  return (
    <section
      className="bg-no-repeat bg-contain bg-center h-full py-12"
      style={{
        backgroundImage:
          "url(/assets/home-page/offer/tree1.svg), url(/assets/home-page/offer/tree2.svg)",
        backgroundPosition: "0% 0%, 100% 100%",
        backgroundSize: "251px 300px, 251px 300px",
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
              <HighlightText>پست های </HighlightText> جدید
              <LoadImage
                src="/assets/home-page/destination/underline.svg"
                alt="arrow"
                height={7}
                width={275}
                className="mt-1.5"
              />
            </p>
            <p className="text-base">
            پست های ما شامل جدیدترین اطلاعات و تغییرات در قوانین مهاجرت و پناهندگی هستند که می‌توانند به شما در تصمیم‌گیری‌های مهم کمک کنند.            </p>
          </article>

          <PostCard />

  
        </div>
      </Container>
    </section>
  );
};

export default posts;
