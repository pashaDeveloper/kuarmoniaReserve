import multer from "multer";
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: `${process.env.MINIO_ENDPOINT}`,
  useSSL: process.env.MINIO_USE_SSL === "true",
  region: process.env.MINIO_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});

const getUploadMiddleware = () => {
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

  const processFiles = async (files, bucketName) => {
    const date = new Date();
    const monthFolder = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    const uploadedFiles = {};

    for (const fieldName in files) {
      uploadedFiles[fieldName] = [];
      for (const file of files[fieldName]) {
        const hashedName = crypto.randomBytes(16).toString("hex");
        const extension = file.originalname.split(".").pop();
        const filename = `${hashedName}.${extension}`;
        const key = `${monthFolder}/${filename}`;

        try {
          await s3Client.send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: key,
              Body: file.buffer,
              ContentType: file.mimetype,
            })
          );

          const fileUrl = `${process.env.MINIO_ENDPOINT}/${bucketName}/${key}`;
          uploadedFiles[fieldName].push(fileUrl);
        } catch (error) {
          throw new Error(`Error uploading file ${filename}: ${error.message}`);
        }
      }
    }

    return uploadedFiles;
  };

  return {
    fields: (fieldDefinitions, bucketName) => (req, res, next) => {
      const middleware = upload.fields(fieldDefinitions);

      middleware(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }

        try {
          const fileUrls = await processFiles(req.files, bucketName);
          req.body = {
            ...req.body,
            ...Object.keys(fileUrls).reduce((acc, key) => {
              acc[key] = fileUrls[key]?.[0] || null;
              return acc;
            }, {}),
          };
          next();
        } catch (uploadError) {
          return res
            .status(500)
            .json({ success: false, message: uploadError.message });
        }
      });
    },
  };
};

export default getUploadMiddleware;
