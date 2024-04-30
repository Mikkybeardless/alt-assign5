export const generateMiddleware = (schema) => {
    return (req,res,next) => {
        if(schema) {
         const result = schema.validate(req.body)
         console.log('Result', result)
         if (result.error){
    
            res.status(400).json({message:"Validation Error", errors: result.error})
         }
    
    
        }
    
        next();
    }
    
    
    }