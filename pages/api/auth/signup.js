import { signUpUser } from "@/controllers/auth.controller";
import getUploadMiddleware from "@/middleware/upload.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
const bucketName = "users";
const uploadMiddleware = getUploadMiddleware(bucketName);
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        await new Promise((resolve, reject) => {
          uploadMiddleware.single("avatar")(req, res, (err) => {
            if (err) {
              console.error("Upload Error: ", err.message);
              return reject(err);
            }
            resolve();
          });
        });
        console.log("upload success")
        // پردازش فایل آپلود شده
        const fileUrls = await uploadMiddleware.processFiles(req.file, bucketName);
        req.body.avatar = fileUrls.avatar || null;

        // ادامه فرآیند ثبت کاربر
        const result = await signUpUser(req);
        return res.status(200).json(result);
      } catch (error) {
        console.error("POST Error: ", error.message);
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

    default:
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
      break;
  }
}
