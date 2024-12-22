import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// تنظیمات اتصال به MinIO
const s3Client = new S3Client({
  endpoint: "http://91.107.189.133",
  port: 9000,
  useSSL: false, // اگر SSL غیرفعال است
  region: "us-east-1", // مقدار پیش‌فرض
  credentials: {
    accessKeyId: "minioadmin", // نام کاربری MinIO
    secretAccessKey: "minioadmin", // رمز عبور MinIO
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
    Bucket: "uploads",
    Key: "test-file.txt",
    Body: Buffer.from("This is a test file content"),
    ContentType: "text/plain",
  };
  console.log("Params: ", params);
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
