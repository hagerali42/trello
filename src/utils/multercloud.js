import multer, { diskStorage } from "multer";


export const cloudinaryUpload = () => {
  const storage = diskStorage({});


  const multerUpload = multer({ storage });
  return multerUpload;
};
