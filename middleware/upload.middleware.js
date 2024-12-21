import multer from "multer";
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT), 
  useSSL: process.env.MINIO_USE_SSL === 'true', 
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});

const getUploadMiddleware = (bucketName) => {
  const storage = multer.memoryStorage();

  const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
      const supportedFormats = /jpg|jpeg|png|mp4|avi|mkv/i;
      const extension = file.originalname.toLowerCase();

      if (supportedFormats.test(extension)) {
        cb(null, true);
      } else {
        cb(new Error("Must be a png/jpg/jpeg or mp4/avi/mkv format"));
      }
    },
  });

  return {
    single: (fieldName) => {
      const middleware = upload.single(fieldName);

      return async (req, res, next) => {
        middleware(req, res, async (err) => {
          if (err) {
            return next(err);
          }

          try {
            const date = new Date();
            const monthFolder = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`;

            const hashedName = crypto.randomBytes(16).toString("hex");
            const extension = req.file.originalname.split('.').pop();
            const filename = `${hashedName}.${extension}`;
            const key = `${monthFolder}/${filename}`;

            // آپلود به MinIO
            await s3Client.send(
              new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
              })
            );

            const fileUrl = `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${key}`;
            req.body[fieldName + "Url"] = fileUrl; // ذخیره لینک فایل آپلود شده

            next();
          } catch (uploadError) {
            next(uploadError);
          }
        });
      };
    },
  };
};

export default getUploadMiddleware;
