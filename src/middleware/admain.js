

export const admain = async (req, res, next) => {
 

   if (!req.user.isAdmain) {
     return next(new Error("you are not Admain", { cause: 400 }));
   }


   
   return next();
 };