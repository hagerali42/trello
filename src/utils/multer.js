import multer,{diskStorage} from "multer";
import { nanoid } from "nanoid";
//diskstorage take two parameters 1-destenation(string,fun) 2-filename as function

export const upload =()=>{
    const storage=diskStorage({
        destination:"uploads",
        filename:(req,file,cb)=>{
            console.log(file);
        }
    })
    
    
    ///multer// take output of diskStorage
    const multerUpload =multer({storage})
    return multerUpload
}

