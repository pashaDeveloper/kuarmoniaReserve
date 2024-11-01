

import LoadImage from "@/components/shared/image/LoadImage";
import Image from "next/image";
import React from "react";
import { BiRightArrowAlt, BiRightArrowCircle } from "react-icons/bi";

const BlogPosts = () => {
  const posts = [
    {
      thumbnail: "/assets/static/Blogs & Guides/1.png",
      title: "چشم‌اندازهای جدید برای زندگی در کشور دیگر",
      summary:
        "مهاجرت فرصتی است برای کشف دیدگاه‌های نو و تجربه‌ی زندگی در محیطی متفاوت.",
      createdAt: "۲۰ ژوئیه ۲۰۲۳",
      featured: true,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/2.png",
      title: "۵ مقصد برتر برای شروع زندگی جدید",
      summary:
        "نگاهی به کشورهایی که امکانات ویژه‌ای برای مهاجران دارند و زندگی باکیفیتی را ارائه می‌دهند.",
      createdAt: "۲۲ ژوئیه ۲۰۲۳",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/3.png",
      title: "چالش‌ها و فرصت‌های مهاجرت",
      summary:
        "مهاجرت ممکن است با چالش‌های جدیدی همراه باشد؛ این مقاله به بررسی آنها و راه‌های سازگاری می‌پردازد.",
      createdAt: "۲۴ ژوئیه ۲۰۲۳",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/4.png",
      title: "زندگی به عنوان یک ماجراجویی در سرزمین‌های ناشناخته",
      summary:
        "مهاجرت، دریچه‌ای است به تجربه‌ی فرهنگ‌ها و مکان‌های جدید و فرصتی برای رشد فردی.",
      createdAt: "۲۶ ژوئیه ۲۰۲۳",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/5.png",
      title: "راهنمای زندگی در کشورهای اروپایی",
      summary:
        "آشنایی با نحوه زندگی، فرهنگ و شرایط اقامت در کشورهای محبوب اروپایی برای مهاجران.",
      createdAt: "۲۸ ژوئیه ۲۰۲۳",
      featured: true,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/6.png",
      title: "۸ نکته ضروری برای موفقیت در مهاجرت",
      summary:
        "از مهارت‌های ارتباطی تا مدیریت منابع مالی، مواردی که برای یک تجربه موفق ضروری هستند.",
      createdAt: "۳۰ ژوئیه ۲۰۲۳",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/7.png",
      title: "راهنمای انتخاب شغل برای مهاجران",
      summary:
        "چگونه شغل مناسبی پیدا کنیم که با مهارت‌هایمان تطابق داشته باشد و در کشور جدید موفق باشیم.",
      createdAt: "۱ اوت ۲۰۲۳",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/8.png",
      title: "تفاوت‌های فرهنگی و سازگاری با آنها",
      summary:
        "آشنایی با تفاوت‌های فرهنگی و راهکارهایی برای تطبیق و همزیستی در کشور جدید.",
      createdAt: "۳ اوت ۲۰۲۳",
      featured: false,
    },
  ];
  

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      {posts.map((post, index) => (
        <div
          key={index}
          className="group flex flex-col gap-y-4 border rounded h-fit break-inside-avoid bg-white transition-color ease-linear delay-100 hover:border-primary relative"
        >
          <LoadImage
            src={post.thumbnail}
            alt={post.title}
            width={427}
            height={350}
            className="rounded-t w-full object-cover"
          />
          <article className="flex flex-col gap-y-2.5 px-4 pb-4">
            <h2 className="text-lg line-clamp-1">{post.title}</h2>
            <div className="mt-auto flex flex-col gap-y-2.5">
              <p className="text-sm line-clamp-2">{post.summary}</p>
              <p className="text-xs border border-secondary transition-colors ease-linear delay-100 group-hover:border-primary px-2 py-0.5 rounded-primary text-slate-500 flex items-center justify-between relative">
                {post.createdAt} •{" "}
                <span className="text-red-500/50 group-hover:text-red-500">
                  Not Available
                </span>
                <span className="absolute -right-1 bg-secondary rounded-secondary p-0.5 flex justify-center items-center transition-opacity ease-linear opacity-0 group-hover:opacity-100 border border-primary cursor-pointer sr-only">
                  <BiRightArrowAlt className="h-6 w-6 text-primary" />
                </span>
              </p>
            </div>
          </article>

          {post.featured && (
            <span className="absolute px-2 py-0.5 text-xs top-2 left-2 border border-primary rounded-primary bg-secondary">
              Featured
            </span>
          )}
        </div>
      ))}
    </section>
  );
};

export default BlogPosts;
