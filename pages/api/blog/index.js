import { addBlog, getBlogs, updateBlog } from "@/controllers/blog.controller";

export const config = {
  api: {
    bodyParser: true,  
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const result = await addBlog(req);
        console.log(result);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
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
