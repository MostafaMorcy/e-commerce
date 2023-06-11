import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/AppError.js";

let options=(folderName)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `uploads/${folderName}`);
        },
        filename: (req, file, cb) => {
          cb(null, uuidv4() + "-" + file.originalname);
          console.log(file);
        },
      });
      const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
          cb(null, true); 
        } else {
          cb(new AppError('images only',400), false);
        }
      };
   return multer({ storage,fileFilter });
}
export const uploadSingleFile = (filedName,folderName) => options(folderName).single(filedName)
export const uploadMixFiles  =(arrayOfFields,folderName)=>options(folderName).fields(arrayOfFields)
