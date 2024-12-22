import multer from "multer";
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

console.log("S3 Endpoint:", process.env.MINIO_ENDPOINT);
console.log("Full Endpoint:", `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`);
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
    processFiles: async (files, bucketName) => {
      const date = new Date();
      const monthFolder = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      const uploadedFiles = {};

      // پیمایش در فایل‌ها
      for (const fieldName in files) {
        uploadedFiles[fieldName] = [];
        for (const file of files[fieldName]) {
          const hashedName = crypto.randomBytes(16).toString("hex");
          const extension = file.originalname.split(".").pop();
          const filename = `${hashedName}.${extension}`;
          const key = `${filename}`;
          console.log("process.env.MINIO_ENDPOINT:", process.env.MINIO_ENDPOINT);
          console.log("bucketName:", bucketName);
          console.log("key:", key);
          try {
            await s3Client.send(
              new PutObjectCommand({
                Bucket: "uploads",
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
              })
            );

    
            const fileUrl = `${process.env.MINIO_ENDPOINT}/${bucketName}/${key}`;
            console.log("Generated File URL:", fileUrl);
            uploadedFiles[fieldName].push(fileUrl);
          } catch (error) {
            console.error(`process:`, process.env.MINIO_ENDPOINT);
            console.error(`Error uploading file ${filename}:`, error.message);
            throw new Error("Error uploading file to S3");
          }
        }
      }

      return uploadedFiles;
    },
  };
};

export default getUploadMiddleware;
