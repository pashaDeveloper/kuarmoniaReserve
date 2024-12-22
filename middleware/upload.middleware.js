import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// تنظیمات اتصال به Minio
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

const getUploadMiddleware = (bucketName) => {
  const storage = multer.memoryStorage();

  const upload = multer({
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

  return {
    single: (fieldName) => upload.single(fieldName),
    fields: (fieldDefinitions) => upload.fields(fieldDefinitions),
    processFiles: async (files) => {
      const uploadedFiles = {};

      // پیمایش در فایل‌ها
      for (const fieldName in files) {
        uploadedFiles[fieldName] = [];
        for (const file of files[fieldName]) {
          const filename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');  // تبدیل کاراکترهای غیرمجاز
          const key = `${filename}`;

          console.log("process.env.MINIO_ENDPOINT:", process.env.MINIO_ENDPOINT);
          console.log("bucketName:", bucketName);
          console.log("key:", key);
          console.log("Attempting to upload file...");
          console.log("File Details:", {
            name: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
          });

          try {
            // ارسال فایل به Minio
            await s3Client.send(
              new PutObjectCommand({
                Bucket: bucketName, // استفاده از نام سطل (bucket) از پارامتر
                Key: key, // استفاده از نام اصلی فایل
                Body: file.buffer,
                ContentType: file.mimetype,
              })
            );

            const fileUrl = `${process.env.MINIO_ENDPOINT}/${bucketName}/${key}`;
            console.log("Generated File URL:", fileUrl);
            uploadedFiles[fieldName].push(fileUrl);
          } catch (error) {
            console.error(`Error uploading file ${filename}:`, error.message);
            if (error.$response) {
              console.error("Raw Response:", error.$response);
            }
            throw error;
          }
        }
      }

      return uploadedFiles;
    },
  };
};

export default getUploadMiddleware;
