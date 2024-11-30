import { updateBlog, getBlog } from "@/controllers/blog.controller";
import verify from "@/middleware/verify.middleware";
import authorization from "@/middleware/authorization.middleware";
import getUploadMiddleware from "@/middleware/upload.middleware"; // اضافه کردن این خط

export const config = {
  api: {
    bodyParser: false,  // باید bodyParser را غیر فعال کنید تا فایل‌ها به درستی ارسال شوند
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        verify(req, res, async (err) => {
          if (err) {
            return res.status(401).json({
              success: false,
              error: err.message,
            });
          }

          authorization("superAdmin")(req, res, async (err) => {
            if (err) {
              return res.status(403).json({
                success: false,
                error: err.message,
              });
            }

            const result = await getBlog(req);
            return res.status(200).json(result);
          });
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message,
        });
      }
      break;

    case "PATCH":
      const upload = getUploadMiddleware("blog");
      upload.single("featuredImage")(req, res, async (err) => {
        if (err) {
          console.error("Upload Error: ", err.message);
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }

        try {
          verify(req, res, async (err) => {
            authorization("superAdmin")(req, res, async (err) => {
              if (err) {
                return res.status(403).json({
                  success: false,
                  error: err.message,
                });
              }
              const result = await updateBlog(req);
              return res.status(200).json(result);
            });
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            error: error.message,
          });
        }
      });
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
