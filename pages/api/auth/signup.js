import { signUpUser } from "@/controllers/auth.controller";
import getUploadMiddleware from "@/middleware/upload.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
const uploadMiddleware = getUploadMiddleware();

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const upload = getUploadMiddleware("user");
        uploadMiddleware.fields(
          [{ name: "avatar", maxCount: 1 }],
          "user" // bucketName
        )(req, res, async () => {
          try {
            const result = await signUpUser(req);
            res.status(200).json(result);
          } catch (signUpError) {
            res.status(500).json({
              success: false,
              message: signUpError.message,
            });
          }
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
      break;
  }
}
