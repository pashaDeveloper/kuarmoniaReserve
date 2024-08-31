

import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";

const AdvantageArticle = () => {
  const items = [
    {
      _id: 1,
      icon: (
        <LoadImage
          src={"/assets/home-page/advantage/earth.svg"}
          alt={"earth"}
          height={60}
          width={60}
          className="border border-primary shadow-lg rounded-full"
        />
      ),
      title: "تجربه و تخصص",
      description:
        "تیم  ما از مشاوران و وکلای با تجربه تشکیل شده است که با قوانین و روندهای مهاجرت و پناهندگی به خوبی آشنا هستند. تجربه و تخصص ما به شما کمک می‌کند تا مراحل پیچیده این فرآیند را با اطمینان و آرامش طی کنید.",
    },
    {
      _id: 2,
      icon: (
        <LoadImage
          src={"/assets/home-page/advantage/smile.svg"}
          alt={"smile"}
          height={60}
          width={60}
          className="border border-primary shadow-lg rounded-full"
        />
      ),
      title: "پشتیبانی شخصی‌سازی شده",
      description:
        "خدمات ما کاملاً متناسب با نیازهای خاص شما طراحی شده است. ما به هر مشتری توجه فردی داریم و مشاوره‌های شخصی‌سازی شده‌ای ارائه می‌دهیم که به شما کمک می‌کند بهترین تصمیمات را بگیرید.",
    },
    {
      _id: 3,
      icon: (
        <LoadImage
          src={"/assets/home-page/advantage/star.svg"}
          alt={"star"}
          height={60}
          width={60}
          className="border border-primary shadow-lg rounded-full"
        />
      ),
      title: "رویکرد سریع و کارآمد",
      description:
        "ما از روش‌های به‌روز و کارآمد استفاده می‌کنیم تا فرآیندهای مهاجرت و پناهندگی را به سرعت و با دقت پیش ببریم، به‌طوری‌که شما بتوانید سریع‌تر به هدف‌های خود برسید..",
    },
    {
      _id: 4,
      icon: (
        <LoadImage
          src={"/assets/home-page/advantage/star.svg"}
          alt={"star"}
          height={60}
          width={60}
          className="border border-primary shadow-lg rounded-full"
        />
      ),
      title: "پشتیبانی از ابتدای تا انتهای فرآیند",
      description:
        "از مرحله ارزیابی اولیه تا پیگیری نهایی، ما در کنار شما خواهیم بود. تیم ما در هر مرحله از فرآیند به شما کمک می‌کند و از هرگونه چالش و مشکل پیشگیری می‌کند.",
    },
  ];

  return (
    <article className="flex flex-col gap-y-8">
      <h2 className="lg:text-4xl md:text-3xl text-2xl">
چرا انتخاب ما یک انتخاب ایده آل است        <LoadImage
          src={"/assets/home-page/advantage/line.svg"}
          alt={"line"}
          height={10}
          width={150}
          className="mt-1.5"
        />
      </h2>
      <div className="flex flex-col gap-y-4">
        {items.map(({ _id, icon, title, description }) => (
          <div
            key={_id}
            className="flex gap-x-2 items-start bg-white/70 shadow p-primary rounded-primary"
          >
            {icon}
            <div className="w-full flex flex-col gap-y-1">
              <h2 className="text-lg">{title}</h2>
              <p className="text-sm lg:line-clamp-none md:line-clamp-2 line-clamp-none">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default AdvantageArticle;
