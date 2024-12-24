import { addSlide, getSlides,getClientSlides } from "@/controllers/slide.controller";
import upload from "@/middleware/upload.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      console.log("slide");
      upload("slide").single("bgImg")(req, res, async (err) => {
        if (err) {
          console.error("Upload Error: ", err.message);
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }

        try {
          const result = await addSlide(req);
          res.status(200).json(result);
        } catch (AddSlideError) {
          console.error("AddSlide Error: ", AddSlideError.message);
          res.status(500).json({
            success: false,
            message: AddSlideError.message,
          });
        }
      });
      break;

    case "GET":
      try {
        if (req.query.type === "client") {

          const result = await getClientSlides(req);
          return res.status(200).json(result);
        }
        const result = await getSlides(req); 
        return res.status(200).json(result); 
      } catch (error) {
        console.error("GET Error: ", error.message);
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
}
