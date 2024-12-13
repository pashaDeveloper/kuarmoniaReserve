import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import {
  useGetClientGalleryQuery,
  useGetGalleryQuery
} from "@/services/gallery/galleryApi";

const Gallery = () => {
  const { data, isLoading, error } = useGetClientGalleryQuery();
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetGalleryQuery(selectedGalleryId);

  const gallery = useMemo(() => fetchData?.data || {}, [fetchData]);
  const containerRef = useRef(null);
  const categories = data?.data || [];
  console.log("categories", categories);
  console.log("gallery", gallery?.gallery);

  const [tab, setTab] = useState(null);
  const [counter, setCounter] = useState(9);

  useEffect(() => {
    if (categories.length > 0) {
      setTab(categories[0].category._id);
    }
  }, [categories]);

  useEffect(() => {
    if (tab) {
      const selectedCategory = categories.find(
        (cat) => cat.category._id === tab
      );
      if (selectedCategory) {
        setSelectedGalleryId(selectedCategory._id);
      }
    }
  }, [tab, categories]);

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
              با مرور گالری تصاویر، شما با کیفیت خدمات و راهکارهای ما آشنا
              می‌شوید و می‌توانید ببینید که چگونه ما به مشتریان خود ارزش افزوده
              می‌دهیم.
            </p>
          </article>
        </div>

        <div className="border border-primary/30 rounded-2xl bg-secondary/30 lg:p-12 md:p-6 p-3 animate-pulse">
          <div className="grid grid-cols-12 items-center gap-4 h-[720px] overflow-hidden">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`lg:col-span-3 md:col-span-6 col-span-12 border w-full bg-gray-300 drop-shadow rounded ${
                  index % 2 === 0 ? "row-span-2 h-[364px]" : "h-[159px]"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  if (isLoading || fetching) {
    return (
      <section id="deals" className="h-full py-12">
        <Container>{renderSkeleton()}</Container>
      </section>
    );
  }

  if (error || gallery.length === 0) {
    return (
      <section id="deals" className="h-full py-12">
        <Container>{renderSkeleton()}</Container>
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
                با مرور گالری تصاویر، شما با کیفیت خدمات و راهکارهای ما آشنا
                می‌شوید و می‌توانید ببینید که چگونه ما به مشتریان خود ارزش
                افزوده می‌دهیم.
              </p>
            </article>
          </div>

          <div className="border border-primary/30 rounded-2xl bg-secondary/30 lg:p-12 md:p-6 p-3">
            <div className="flex flex-col gap-y-8">
              {/* تب‌های دسته‌بندی */}
              <div className="flex flex-row flex-wrap gap-4">
                {categories.map((category) => (
                  <span
                    key={category?.category?.title}
                    className={
                      "border border-primary px-4 py-1 rounded-secondary text-sm hover:bg-primary hover:border-secondary hover:text-white transition-colors cursor-pointer" +
                      " " +
                      (tab === category?.category?._id
                        ? "bg-primary border-secondary text-white"
                        : "")
                    }
                    onClick={() => setTab(category?.category?._id)}
                  >
                    {category?.category?.title}
                  </span>
                ))}
              </div>

              {/* گالری تصاویر */}
              <div className="relative">
                <div
                  className="grid grid-cols-12 items-center gap-4 h-[720px] overflow-y-hidden scrollbar-hide"
                  ref={containerRef}
                >
                    {gallery?.gallery?.map((image,index) => (
                      <LoadImage
                        key={`${image._id}-${index}`}
                        src={image.url}
                        alt={image.description}
                        height={(index + 1) % 2 === 0 ? 364 : 159}
                        width={267}
                        className={`lg:col-span-3 md:col-span-6 col-span-6 border w-full object-cover border-primary/30 drop-shadow rounded ${index % 2 === 0 ? "row-span-2 h-[364px]" : "h-[159px]"}`}
                        title={image.description}
                      />
                    
                  ))}  

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
                        behavior: "smooth"
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
                        behavior: "smooth"
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
