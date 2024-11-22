import mongoose from "mongoose";
import Category from "@/models/category.model";
import connectDB from "@/libs/db";

const seedCategories = [
    { 
      title: "مهاجرت", 
      description: "راهنماهای جامع در مورد روش‌ها و شرایط مهاجرت به کشورهای مختلف شامل کار، تحصیل و سرمایه‌گذاری.", 
      authorId: "" 
    },
    { 
      title: "پناهندگی", 
      description: "اطلاعات کامل در مورد فرآیندهای قانونی و حقوقی پناهندگی در کشورهای مختلف.", 
      authorId: "" 
    },
    { 
      title: "تحصیل در خارج", 
      description: "مطالب مرتبط با اخذ ویزای تحصیلی، انتخاب دانشگاه و شرایط تحصیل در خارج از کشور.", 
      authorId: "" 
    },
    { 
      title: "ویزای کاری", 
      description: "بررسی شرایط، مدارک مورد نیاز و راهنمای دریافت ویزای کاری در کشورهای مختلف.", 
      authorId: "" 
    },
    { 
      title: "سرمایه‌گذاری", 
      description: "اطلاعاتی در مورد روش‌های مهاجرت از طریق سرمایه‌گذاری و کارآفرینی در کشورهای پیشرفته.", 
      authorId: "" 
    },
    { 
      title: "اقامت دائم", 
      description: "راهنمای اخذ اقامت دائم و مراحل لازم برای مهاجران.", 
      authorId: "" 
    },
    { 
      title: "زندگی در خارج", 
      description: "مطالبی در مورد تجربه‌ها و چالش‌های زندگی در کشورهای مختلف.", 
      authorId: "" 
    },
    { 
      title: "قوانین مهاجرت", 
      description: "بررسی قوانین و مقررات مهاجرت در کشورهای گوناگون.", 
      authorId: "" 
    },
    { 
      title: "آزمون‌های زبان", 
      description: "راهنمای شرکت در آزمون‌های زبان مانند آیلتس و تافل برای مهاجرت.", 
      authorId: "" 
    },
  ];
  
const createSeedCategories = async (authorId) => {
  try {
    await connectDB();
    const categoriesWithAuthor = seedCategories.map(category => ({
      ...category,
      authorId: authorId,
    }));

    const result = await Category.insertMany(categoriesWithAuthor);
    console.log("دسته‌بندی‌های اولیه ساخته شدند:", result);

    mongoose.connection.close();
    return result; // بازگرداندن دسته‌بندی‌های ایجاد شده
  } catch (error) {
    console.error("خطا در ساخت دسته‌بندی‌ها:", error);
    mongoose.connection.close();
  }
};

export default createSeedCategories;
