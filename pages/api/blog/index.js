import { addBlog, getBlogs, updateBlog } from "@/controllers/blog.controller";
import upload from "@/middleware/upload.middleware"; // مسیر صحیح به middleware

export const config = {
  api: {
    bodyParser: true,  
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      upload.single("featuredImage")(req, res, async (err) => {
        if (err) {
            console.error("Upload Error: ", err.message);
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    
        console.log('Uploaded File:', req.file); // بررسی فایل آپلود شده
        console.log('Request Body:', req.body); // بررسی بدنه درخواست
    
        // تنظیم فیلد featuredImage
        req.body.featuredImage = req.body.filePath;
    
        try {
            const result = await addBlog(req);
            res.status(200).json(result);
        } catch (AddBlogError) {
            console.error("AddBlog Error: ", AddBlogError.message);
            res.status(500).json({
                success: false,
                message: AddBlogError.message,
            });
        }
    });
      break;

    // موارد دیگر برای روش‌های مختلف HTTP مانند GET, PUT, DELETE
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}

