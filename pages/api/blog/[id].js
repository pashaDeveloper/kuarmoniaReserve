import { updateBlog } from "@/controllers/blog.controller"; // Change to the blog controller

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "PATCH":
      try {
        const result = await updateBlog(req); // Call the updateBlog function
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
