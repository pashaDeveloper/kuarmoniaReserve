import { updateBlog, getBlog } from "@/controllers/blog.controller"; // Change to the blog controller
import verify from "@/middleware/verify.middleware";
import authorization from "@/middleware/authorization.middleware";

export const config = {
  api: {
    bodyParser: true,
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
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
