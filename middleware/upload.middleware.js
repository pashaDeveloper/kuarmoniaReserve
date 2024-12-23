import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// تنظیمات اتصال به MinIO
const s3Client = new S3Client({
  endpoint: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,
  useSSL: process.env.MINIO_USE_SSL === "true", 
  region: process.env.MINIO_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY, 
    secretAccessKey: process.env.MINIO_SECRET_KEY, 
  },
});

const storage = (folderName) => multer.diskStorage({
  destination: (req, file, cb) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const destinationFolder = path.join('uploads', folderName, `${year}`, `${month}`);
    cb(null, destinationFolder);  // ذخیره‌سازی فایل در پوشه داینامیک
  },
  filename: (req, file, cb) => {
    const sanitizedName = `${Date.now()}_${file.originalname
      .replace(/[^\w\s.-]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    cb(null, sanitizedName);
  },
});

const upload = (folderName) => multer({
  storage: storage(folderName),
  fileFilter: (_, file, cb) => {
    const supportedImageAndVideo = /jpg|jpeg|png|mp4|avi|mov|mkv/i;
    const originalname = file.originalname;
    const extension = originalname.substring(originalname.lastIndexOf(".") + 1);

    if (supportedImageAndVideo.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg/mp4/avi format"));
    }
  },
});

const uploadToMinIO = (file, folderName) => {
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const fileNameHash = crypto.createHash("sha256").update(file.filename).digest("hex");
    
    const filePath = path.join("uploads", folderName, year, month, file.filename);
    const fileKey = `${folderName}/${year}/${month}/${fileNameHash}`;

    const params = {
      Bucket: process.env.MINIO_BUCKET_NAME, 
      Key: fileKey, 
      Body: fs.createReadStream(filePath),
      ContentType: file.mimetype,
    };

    s3Client.send(new PutObjectCommand(params))
      .then(() => {
        fs.unlinkSync(filePath);
        resolve({
          url: `${process.env.MINIO_URL}/${process.env.MINIO_BUCKET_NAME}/${fileKey}`,
          public_id: fileKey,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default upload;
