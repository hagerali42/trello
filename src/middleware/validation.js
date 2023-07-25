// const dataMethods =['body', 'query', 'params', 'headers', 'file']
// export const validation=(schema)=>{
//     // console.log({K:Object.keys(schema)});
// return( req,res, next) =>{
    
//     const validationErrors=[];
//     dataMethods.forEach((key)=>{
//         if(schema[key]){//keys body or paramr or...... 
//             const validationResult= schema[key].validate(req[key],{abortEarly:false})
//             if(validationResult.error){
//                 validationErrors.push(validationResult.error.details)
//             }
//         }
//     })
//     if(validationErrors.length){
//     return res.json({message:'Validation Error',validationErrors})
//     }
//     return next()
// }
//

export const validation=(schema)=>{
    return( req, res, next)=>{
        const validationResult=schema.validate({...req.body, ...req.params,...req.query},{abortEarly:false})
        if(validationResult.error){
            return res.json({
                messages:"Validation Errors",
                validationResult:validationResult.error.details
            })
        }
        return next()
    }
}