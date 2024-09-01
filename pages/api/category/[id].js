
import {  softDeleteCategory} from "@/controllers/category.controller";


export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {

    case "PATCH":
      try {
        const result = await softDeleteCategory(req);
        
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
     

    default:
      res.send({
        success: false,
        error: "Method not allowed",
      });
      break;
  }
}
