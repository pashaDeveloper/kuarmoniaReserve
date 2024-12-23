import { signUpUser } from "@/controllers/auth.controller";
import upload,{ uploadToMinIO } from "@/middleware/upload.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      const folderName = 'avatar';
      try {
        upload(folderName).single("avatar")(req, res, async (err) => {
          if (err) {
            return res.send({
              success: false,
              message: err.message,
            });
          }
          console.log("avatar successs")
          console.log("req.file successs",req.file)
          await uploadToMinIO(req.file, folderName);
          const result = await signUpUser(req);
          res.send(result);
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
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
