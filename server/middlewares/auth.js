import jwt from 'jsonwebtoken';

const userAuth=async(req,res,next)=>{
    const token = req.headers["token"];
    if(!token){
        return res.json({success:false,message:"Not authorized, login again"})
    }
    try{
        const tokenDecoded=jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecoded.id){
            req.user=tokenDecoded.id;
        }
        else{
            return res.json({success:false,message:"Not authorized, login again"})
        }
        next();
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Invalid token"})
    }
}
export default userAuth;