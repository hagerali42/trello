import jwt  from 'jsonwebtoken'
import userModel from '../../DB/model/User.model.js';

export const auth = async (req, res, next) => {
   const { authorization } = req.headers;
 
   if (!authorization?.startsWith(process.env.TOKEN_BEARER)) {
     return next(new Error("Authorization header is required", { cause: 400 }));
   }
   const token=authorization.split(process.env.TOKEN_BEARER)[1]
   
   if(!token){
     return next(new Error("token is required", { cause: 401}));

   }

   const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
 
   if (!decoded?.id) {
     return next(new Error("Invalid token payload", { cause: 400 }));
   }
 
   const user = await userModel.findById(decoded.id);
   if (!user) {
     return next(new Error("User not found", { cause: 400 }));
   }
   if(user.isLoggedIn==false || user.isDeleated==true){
      return next(new Error("User is not logged in or has been deleted", { cause: 400 }));
     }
   user.isLoggedIn = true;
   await user.save();
 
   req.user = user;
   
   return next();
 };

 
 