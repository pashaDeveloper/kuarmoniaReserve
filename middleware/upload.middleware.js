import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// تنظیمات اتصال به MinIO
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT, 10),
  useSSL: process.env.MINIO_USE_SSL === "true",
  region: process.env.MINIO_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
});

// تنظیمات Multer
const getUploadMiddleware = () => {
  const storage = multer.memoryStorage();
  return multer({
    storage,
    fileFilter: (_, file, cb) => {
      const supportedFormats = /jpg|jpeg|png|mp4|avi|mkv/i;
      const extension = file.originalname.split(".").pop().toLowerCase();
      if (supportedFormats.test(extension)) {
        cb(null, true);
      } else {
        cb(new Error("Must be a png/jpg/jpeg or mp4/avi/mkv format"));
      }
    },
  });
};

// آپلود فایل به MinIO
const uploadToMinio = async (file, bucketName) => {
  const fileKey = `${Date.now()}_${uuidv4()}_${file.originalname}`;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    const fileUrl = `${process.env.MINIO_ENDPOINT}/${bucketName}/${fileKey}`;
    return fileUrl;
  } catch (error) {
    console.error("MinIO Upload Error:", error.message);
    throw new Error("Failed to upload file to MinIO");
  }
};

export { getUploadMiddleware, uploadToMinio };
