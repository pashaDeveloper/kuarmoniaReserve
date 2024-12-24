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
        cb(null, true);
      } else {
        cb(new Error("Must be a png/jpg/jpeg format"));
      }
    },
  });

  const minioUploadMiddleware = (fieldConfig) => async (req, res, next) => {
    multerInstance.fields(fieldConfig)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      const dateFolder = format(new Date(), "yyyy-MM-dd");

      try {
        try {
          await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
        } catch (e) {
          await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
        }

        const uploadedFiles = [];
        const fileFields = Object.keys(req.files || {});
        for (const field of fileFields) {
          for (const file of req.files[field]) {
            const uniqueKey = `${dateFolder}/${crypto
              .randomBytes(16)
              .toString("hex")}_${file.originalname.replace(/[^\w\s.-]/g, "")}`;

            const result = await s3Client.send(
              new PutObjectCommand({
                Bucket: bucketName,
                Key: uniqueKey,
                Body: file.buffer,
                ContentType: file.mimetype,
              })
            );

            uploadedFiles.push({
              fieldName: field,
              url: `${process.env.MINIO_ENDPOINT}/${bucketName}/${uniqueKey}`,
              key: uniqueKey,
              result,
            });
          }
        }

        req.uploadedFiles = uploadedFiles;
        next();
      } catch (error) {
        console.error("Error uploading to MinIO:", error);
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
