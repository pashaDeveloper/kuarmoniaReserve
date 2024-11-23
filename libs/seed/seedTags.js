import mongoose from "mongoose";
import Tag from "@/models/tag.model";
import connectDB from "@/libs/db";

const seedTags = [
    { title: "کانادا", description: 
      "روش‌های مهاجرت به کانادا شامل ویزای کاری، تحصیلی و سرمایه‌گذاری", keywords: ["کانادا", "مهاجرت"], authorId: "" },
    { title: "ترکیه", description: "مراحل دریافت اقامت و زندگی در ترکیه برای مهاجران", keywords: ["ترکیه", "مهاجرت"], authorId: "" },
    { title: "آلمان", description: "بررسی ویزای کار، تحصیل و اقامت دائم در آلمان", keywords: ["آلمان", "مهاجرت"], authorId: "" },
    { title: "ویزای تحصیلی", description: "راهنمای دریافت ویزای تحصیلی برای کشورهای پیشرفته", keywords: ["تحصیل", "ویزا"], authorId: "" },
    { title: "ویزای کاری", description: "شرایط و مدارک موردنیاز برای دریافت ویزای کاری", keywords: ["کار", "ویزا", "استخدام"], authorId: "" },
    { title: "پناهندگی", description: "مراحل قانونی درخواست پناهندگی در اروپا و سایر کشورها", keywords: ["پناهندگی", "حقوق بشر", "کشورهای اروپایی"], authorId: "" },
    { title: "سرمایه‌گذاری", description: "روش‌های مهاجرت اقتصادی از طریق سرمایه‌گذاری در کشورهای مختلف", keywords: ["سرمایه‌گذاری", "مهاجرت اقتصادی"], authorId: "" },
    { title: "اقامت دائم", description: "نحوه اخذ اقامت دائم و مزایای آن", keywords: ["اقامت دائم", "PR", "اقامت"], authorId: "" },
    { title: "استرالیا", description: "روش‌های مهاجرت به استرالیا از طریق کار و تحصیل", keywords: ["استرالیا", "ویزای کاری", "تحصیل"], authorId: "" },
    { title: "آمریکا", description: "مراحل ویزای تحصیلی، کاری و گرین کارت آمریکا", keywords: ["آمریکا", "مهاجرت", "ویزای تحصیلی"], authorId: "" },
    { title: "اکسپرس اینتری", description: "سیستم اکسپرس اینتری برای مهاجرت سریع به کانادا", keywords: ["اکسپرس اینتری", "کانادا", "مهاجرت سریع"], authorId: "" },
    { title: "حقوق بشر", description: "تأثیر حقوق بشر بر قوانین مهاجرت و پناهندگی", keywords: ["حقوق بشر", "پناهندگی", "آزادی"], authorId: "" },
    { title: "تحصیل در اروپا", description: "مراحل اپلای و دریافت ویزای تحصیلی در اروپا", keywords: ["تحصیل", "اروپا", "دانشگاه"], authorId: "" },
    { title: "ویزای شینگن", description: "شرایط دریافت ویزای شینگن برای سفر یا اقامت کوتاه‌مدت", keywords: ["شینگن", "ویزای سفر", "اروپا"], authorId: "" },
    { title: "اقامت ترکیه", description: "مراحل درخواست اقامت ترکیه و تمدید آن", keywords: ["اقامت", "ترکیه", "زندگی در ترکیه"], authorId: "" },
  ];

const createSeedTags = async (authorId) => {
  try {
    await connectDB();
    const tagsWithAuthor = seedTags.map(tag => ({
      ...tag,
      authorId: authorId,
    }));

    const result = await Tag.insertMany(tagsWithAuthor);
    console.log("تگ‌های اولیه ساخته شدند:", result);

    mongoose.connection.close();
    return result;
  } catch (error) {
    console.error("خطا در ساخت تگ‌ها:", error);
    mongoose.connection.close();
  }
};

export default createSeedTags;
