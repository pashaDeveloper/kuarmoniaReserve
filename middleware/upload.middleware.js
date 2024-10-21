import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("foldere",req)
    const uploadFolder = req.body.folder ? path.join('uploads', req.body.folder) : 'uploads';
    cb(null, path.join(process.cwd(), 'public', uploadFolder));
  },
  filename: (req, file, cb) => {
    const hashedName = crypto.randomBytes(16).toString('hex'); 
    const originalName = file.originalname.replace(/[^\w\s.-]/g, "").replace(/\s+/g, "-").toLowerCase();
    const filename = `${hashedName}${path.extname(file.originalname)}`;
    const relativePath = path.join(req.body.folder || 'uploads', filename).replace(/\\/g, "/");

    cb(null, filename);

    req.body.originalName = originalName;
    req.body.filePath = relativePath;
  },
});

// ایجاد نمونه `multer` با تنظیمات بالا
const upload = multer({
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

export default upload;
