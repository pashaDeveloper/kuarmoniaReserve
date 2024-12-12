import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React, { useRef, useState } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { useGetGalleriesQuery } from "@/services/gallery/galleryApi";

const Gallery = () => {
  const { data, isLoading, error } = useGetGalleriesQuery();
  const containerRef = useRef(null);
  const galleries = Array.isArray(data?.data) ? data.data : [];
  const categorizedData = galleries.reduce((acc, item) => {
    const categoryName = item.category?.title || "بدون دسته‌بندی";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  const categories = Object.keys(categorizedData);
  const [tab, setTab] = useState(categories[0] || "بدون دسته‌بندی");
  const [counter, setCounter] = useState(9);

  const renderSkeleton = () => {
    return (
      <section className="w-full h-full flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>گالری</HighlightText> تصاویر
                <LoadImage
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </p>
              <p className="text-base">
                با مرور گالری تصاویر، شما با کیفیت خدمات و راهکارهای ما آشنا می‌شوید و می‌توانید ببینید که چگونه ما به مشتریان خود ارزش افزوده می‌دهیم.
              </p>
            </article>
          </div>

        <div className="border border-primary/30 rounded-2xl bg-secondary/30 lg:p-12 md:p-6 p-3 animate-pulse">
          <div className="grid grid-cols-12 items-center gap-4 h-[720px] overflow-hidden">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`lg:col-span-3 md:col-span-6 col-span-12 border w-full bg-gray-300 drop-shadow rounded ${
                  (index + 1) % 2 === 0 ? "row-span-2 h-[364px]" : "h-[159px]"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  if (isLoading) {
    return (
      <section id="deals" className="h-full py-12">
        <Container>
          {renderSkeleton()}
        </Container>
      </section>
    );
  }

  if (error || galleries.length === 0) {
    return (
      <section id="deals" className="h-full py-12">
        <Container>
          {renderSkeleton()}
        </Container>
      </section>
    );
  }

  return (
    <section id="deals" className="h-full py-12">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>گالری</HighlightText> تصاویر
                <LoadImage
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </p>
              <p className="text-base">
                با مرور گالری تصاویر، شما با کیفیت خدمات و راهکارهای ما آشنا می‌شوید و می‌توانید ببینید که چگونه ما به مشتریان خود ارزش افزوده می‌دهیم.
              </p>
            </article>
          </div>

          <div className="border border-primary/30 rounded-2xl bg-secondary/30 lg:p-12 md:p-6 p-3">
            <div className="flex flex-col gap-y-8">
              {/* تب‌های دسته‌بندی */}
              <div className="flex flex-row flex-wrap gap-4">
                {categories.map((categoryName) => (
                  <span
                    key={categoryName}
                    className={
                      "border border-primary px-4 py-1 rounded-secondary text-sm hover:bg-primary hover:border-secondary hover:text-white transition-colors cursor-pointer" +
                      " " +
                      (tab === categoryName
                        ? "bg-primary border-secondary text-white"
                        : "")
                    }
                    onClick={() => setTab(categoryName)}
                  >
                    {categoryName}
                  </span>
                ))}
              </div>

              {/* گالری تصاویر */}
              <div className="relative">
  <div
    className="grid grid-cols-12 items-center gap-4 h-[720px] overflow-y-hidden scrollbar-hide"
    ref={containerRef}
  >
    {categorizedData[tab]?.slice(0, counter).map((item) =>
      item.gallery.map((image, index) => (
        <LoadImage
          key={`${item._id}-${index}`}
          src={image.url}
          alt={item.description}
          height={(index + 1) % 2 === 0 ? 364 : 159}
          width={267}
          className={`lg:col-span-3 md:col-span-6 col-span-12 border w-full object-cover border-primary/30 drop-shadow rounded ${
            (index + 1) % 2 === 0
              ? "row-span-2 h-[364px]"
              : "h-[159px]"
          }`}
          title={item.description}
        />
      ))
    )}
  </div>

  {/* دکمه‌های اسکرول */}
  <div className="absolute top-4 right-4 flex flex-col gap-y-2">
    <span
      className="p-1.5 border border-primary rounded-secondary bg-secondary hover:bg-primary hover:border-secondary hover:text-white transition-colors cursor-pointer"
      onClick={() => {
        const container = containerRef.current;
        const scrollAmount = -512;

        container.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      }}
    >
      <BiUpArrowAlt className="h-6 w-6" />
    </span>
    <span
      className="p-1.5 border border-primary rounded-secondary bg-secondary hover:bg-primary hover:border-secondary hover:text-white transition-colors cursor-pointer"
      onClick={() => {
        const container = containerRef.current;
        const scrollAmount = 512;

        container.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      }}
    >
      <BiDownArrowAlt className="h-6 w-6" />
    </span>
  </div>
</div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Gallery;
