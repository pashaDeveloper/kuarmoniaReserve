

import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";
import BlogPosts from "./BlogPosts";

const Blogs = () => {
  return (
    <section
      id="blogs"
      className=" bg-clip-border h-full py-12"
      style={{
        backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%",
        // backgroundSize: "100% 100%",
      }}
    >
      <Container>

        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>بلاگ</HighlightText> & راهنما
                <LoadImage
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
              این بلاگ‌ها به موضوعات مهاجرت، پناهندگی، ازدواج و سرمایه‌گذاری در کشورهای خارجی می‌پردازند و اطلاعات مفیدی برای افرادی که قصد تغییر و تحول در زندگی خود دارند، ارائه می‌دهند. مطالب ما راهنمایی‌های کاربردی و به‌روزی برای شروع یک زندگی جدید در کشورهای مختلف فراهم می‌کنند.
              </p>
            </article>
          </div>

          <BlogPosts />
        </section>
      </Container>
    </section>
  );
};

export default Blogs;
