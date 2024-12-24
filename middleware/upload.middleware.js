import multer from "multer";
import crypto from "crypto";
import { S3Client, PutObjectCommand, CreateBucketCommand, HeadBucketCommand } from "@aws-sdk/client-s3";
import { format } from "date-fns";

// تنظیمات MinIO
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  useSSL: process.env.MINIO_USE_SSL === "true",
  region: process.env.MINIO_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});

// ساخت تابع `upload`
const upload = (bucketName) => {
  const storage = multer.memoryStorage();

  const multerInstance = multer({
    storage,
    fileFilter: (_, file, cb) => {
      const supportedImage = /jpg|jpeg|png/i;
      const extension = file.originalname
        .split(".")
        .pop()
        .toLowerCase();

      if (supportedImage.test(extension)) {
        console.log("File format supported:", file.originalname);  // Log supported file format
        cb(null, true);
      } else {
        console.log("File format not supported:", file.originalname);  // Log unsupported file format
        cb(new Error("Must be a png/jpg/jpeg format"));
      }
    },
  });

  const minioUploadMiddleware = (fieldConfig) => async (req, res, next) => {
    console.log("Starting file upload...");  // Log before file upload process
    multerInstance.fields(fieldConfig)(req, res, async (err) => {
      if (err) {
        console.error("Multer upload error:", err.message);  // Log multer error
        return res.status(400).json({ success: false, message: err.message });
      }

      console.log("Files uploaded:", req.files);  // Log uploaded files details

      const dateFolder = format(new Date(), "yyyy-MM-dd");
      console.log("Uploading to date folder:", dateFolder);  // Log date folder

      try {
        // Check if bucket exists
        try {
          await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
          console.log("Bucket exists:", bucketName);  // Log if bucket exists
        } catch (e) {
          console.log("Bucket does not exist, creating bucket...");  // Log when creating bucket
          await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
        }

        const uploadedFiles = [];
        const fileFields = Object.keys(req.files || {});
        console.log("File fields:", fileFields);  // Log file fields

        for (const field of fileFields) {
          for (const file of req.files[field]) {
            const uniqueKey = `${dateFolder}/${crypto
              .randomBytes(16)
              .toString("hex")}_${file.originalname.replace(/[^\w\s.-]/g, "")}`;
            console.log("Generated unique key:", uniqueKey);  // Log unique key for each file

            const result = await s3Client.send(
              new PutObjectCommand({
                Bucket: bucketName,
                Key: uniqueKey,
                Body: file.buffer,
                ContentType: file.mimetype,
              })
            );
            console.log("Upload result:", result);  // Log upload result

            uploadedFiles.push({
              fieldName: field,
              url: `${process.env.MINIO_ENDPOINT}/${bucketName}/${uniqueKey}`,
              key: uniqueKey,
              result,
            });
          }
        }

        req.uploadedFiles = uploadedFiles;
        console.log("Uploaded files:", uploadedFiles);  // Log the final uploaded files
        next();
      } catch (error) {
        console.error("Error uploading to MinIO:", error);  // Log error while uploading to MinIO
        res.status(500).json({ success: false, message: "Error uploading files" });
      }
    });
  };

  return {
    single: (fieldName) => minioUploadMiddleware([{ name: fieldName, maxCount: 1 }]),
    array: (fieldName, maxCount) => minioUploadMiddleware([{ name: fieldName, maxCount: maxCount || 10 }]),
    fields: (fieldsConfig) => minioUploadMiddleware(fieldsConfig),
  };
};

export default upload;
