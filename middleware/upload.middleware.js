import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const getUploadMiddleware = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const date = new Date();
      const monthFolder = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      const fullPath = path.join(process.cwd(), "public/uploads", folderName, monthFolder);

      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }

      req.monthFolder = monthFolder; 
      cb(null, fullPath); 
    },
    filename: (req, file, cb) => {
      const hashedName = crypto.randomBytes(16).toString("hex");
      const extension = path.extname(file.originalname);
      const filename = `${hashedName}${extension}`;

      req.body.filePath = `/uploads/${folderName}/${req.monthFolder}/${filename}`.replace(/\\/g, "/");
      cb(null, filename);
    },
  });

  return multer({
    storage,
    fileFilter: (_, file, cb) => {
      const supportedImage = /jpg|jpeg|png/i;
      const extension = path.extname(file.originalname).toLowerCase();

      if (supportedImage.test(extension)) {
        cb(null, true);
      } else {
        cb(new Error("Must be a png/jpg/jpeg format"));
      }
    },
  });
};

export default getUploadMiddleware;
