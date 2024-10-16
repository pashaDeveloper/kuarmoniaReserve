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
      upload.single("gallery")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          console.error("Multer Error: ", err.message);
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        } else if (err) {
          console.error("Upload Error: ", err.message);
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }

        try {
          const result = await addBlog(req);
          res.status(200).json(result);
        } catch (signUpError) {
          console.error("SignUp Error: ", signUpError.message);
          res.status(500).json({
            success: false,
            message: signUpError.message,
          });
        }
      });
      break;

    case "GET":
      try {
        const result = await getBlogs(req);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;

    case "PATCH":
      try {
        const result = await updateBlog(req);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;

    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
}
