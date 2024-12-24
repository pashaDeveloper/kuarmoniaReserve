import multer from "multer";
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// تنظیمات اتصال به Minio
const s3Client = new S3Client({
  endpoint: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,  // ترکیب آدرس endpoint و port
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
      console.log("File received:", file);
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
      console.log("processFiles: received files:", files);
      console.log("processFiles: bucketName:", bucketName);
    
      const date = new Date();
      const monthFolder = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      console.log("processFiles: monthFolder:", monthFolder);
      const uploadedFiles = {};
      for (const fieldName in files) {
        console.log(`processFiles: Processing fieldName: ${fieldName}`);
        uploadedFiles[fieldName] = [];
        for (const file of files[fieldName]) {
          const hashedName = crypto.randomBytes(16).toString("hex");
          const extension = file.originalname.split(".").pop();
          const filename = `${hashedName}.${extension}`;
          const key = `${monthFolder}/${filename}`;
          console.log("processFiles: Processing file:", file);
          console.log("processFiles: file.originalname:", file.originalname);
          console.log("processFiles: file.mimetype:", file.mimetype);
          console.log("processFiles: hashedName:", hashedName);
          console.log("processFiles: file extension:", extension);
          console.log("processFiles: filename:", filename);
          console.log("processFiles: key:", key);

          try {
            try {
              const result = await s3Client.send(
                new PutObjectCommand({
                  Bucket: bucketName,
                  Key: key,
                  Body: file.buffer,
                  ContentType: file.mimetype,
                })
              );
            
              console.log("File uploaded successfully:", result);
            } catch (error) {
              console.error("Error uploading file:", error);
            }

            const fileUrl = `${process.env.MINIO_ENDPOINT}/${bucketName}/${key}`;
            console.log("processFiles: File uploaded successfully:", fileUrl);

            uploadedFiles[fieldName].push(fileUrl);
          } catch (error) {
            console.error(`process:`, process.env.MINIO_ENDPOINT);
            console.error(`Error uploading file ${filename}:`, error.message);
            console.error("Raw Response: ", error.$response);
            throw new Error("Error uploading file to S3");
          }
        }
      }

      return uploadedFiles;
    },
  };
};

export default getUploadMiddleware;
