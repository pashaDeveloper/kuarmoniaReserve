import mongoose from "mongoose";
import Blog from "../models/blog.model";  
import connectDB from "../libs/db";     
import User from "../models/user.model"; 

const seedBlogs = [
  {
    title: "راهنمای کامل مهاجرت به کانادا",
    description: "در این مقاله، مراحل مختلف مهاجرت به کانادا به صورت کامل بررسی شده است.",
    featuredImage: {
      url: "https://example.com/canada-migration.jpg",
      public_id: "canada-migration",
      originalName: "canada-migration.jpg",
    },
    content: `<pre><code class="language-plaintext">
      مهاجرت به کانادا یکی از پرطرفدارترین گزینه‌ها برای افراد جویای زندگی بهتر است. 
      در این مقاله، مراحل زیر به تفصیل توضیح داده شده است:
      1. انتخاب نوع ویزا (کاری، تحصیلی، سرمایه‌گذاری)
      2. آماده‌سازی مدارک لازم
      3. ارسال درخواست از طریق سیستم آنلاین اکسپرس اینتری
      4. مراحل بعد از پذیرش مانند تهیه محل سکونت و انتقال مالی
      </code></pre>`,
    tags: ["مهاجرت", "کانادا", "ویزای کاری"],
    category: "645e34d8f19c220e70cbb217", 
    authorId: "",
    publishDate: new Date(),
    publishStatus: "approved",
    metaKeywords: ["مهاجرت", "کانادا", "اقامت دائم"],
  },
  {
    title: "نکاتی برای پناهندگی در اروپا",
    description: "راهنمایی‌هایی برای افرادی که به دنبال پناهندگی در کشورهای اروپایی هستند.",
    featuredImage: {
      url: "https://example.com/europe-refugee.jpg",
      public_id: "europe-refugee",
      originalName: "europe-refugee.jpg",
    },
    content: `<pre><code class="language-plaintext">
      پناهندگی یکی از گزینه‌های پرچالش برای مهاجرت است. نکات کلیدی:
      - کشورهای محبوب برای پناهندگی: آلمان، سوئد، فرانسه
      - آماده‌سازی مدارک شامل مدارک هویتی و دلایل پناهندگی
      - ثبت درخواست از طریق مراکز پذیرش مهاجر
      - آشنایی با قوانین پناهندگی کشور مقصد
      </code></pre>`,
    tags: ["پناهندگی", "اروپا", "حقوق بشر"],
    category: "645e34d8f19c220e70cbb218", 
    authorId: "",
    publishDate: new Date(),
    publishStatus: "approved",
    metaKeywords: ["پناهندگی", "اروپا", "آلمان", "سوئد"],
  },
  {
    title: "مهاجرت تحصیلی؛ فرصتی برای آینده بهتر",
    description: "در این مقاله، مهاجرت تحصیلی به کشورهای پیشرفته بررسی شده است.",
    featuredImage: {
      url: "https://example.com/education-migration.jpg",
      public_id: "education-migration",
      originalName: "education-migration.jpg",
    },
    content: `<pre><code class="language-plaintext">
      مهاجرت تحصیلی یکی از محبوب‌ترین راه‌های مهاجرت است. 
      برای موفقیت در این مسیر باید مراحل زیر را طی کنید:
      1. انتخاب دانشگاه مناسب در کشورهای پیشرفته مانند آمریکا، کانادا یا استرالیا
      2. آماده‌سازی مدارک: ترجمه مدارک تحصیلی و آزمون‌های زبان مانند آیلتس
      3. درخواست پذیرش از دانشگاه مورد نظر
      4. دریافت ویزای تحصیلی و برنامه‌ریزی برای اسکان
      </code></pre>`,
    tags: ["مهاجرت تحصیلی", "آمریکا", "کانادا"],
    category: "645e34d8f19c220e70cbb219", 
    authorId: "", 
    publishDate: new Date(),
    publishStatus: "approved",
    metaKeywords: ["مهاجرت تحصیلی", "دانشگاه", "ویزای تحصیلی"],
  }
];

const createSeedBlogForFirstUser = async (authorId) => {
  try {
    await connectDB();

    const blogsWithAuthor = seedBlogs.map(blog => ({
      ...blog,
      authorId: authorId, 
    }));

    await Blog.insertMany(blogsWithAuthor);
    console.log("بلاگ‌های اولیه برای اولین کاربر ساخته شد.");

    mongoose.connection.close();
  } catch (error) {
    console.error("خطا در ساخت بلاگ‌ها:", error);
    mongoose.connection.close();
  }
};
