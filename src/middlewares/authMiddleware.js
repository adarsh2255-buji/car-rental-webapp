import jwt from 'jsonwebtoken'
import User from "../model/userModel.js";

//token verification middleware
const protect = async(req, res, next) =>{
    let token;

    if(req.cookies.token){
        try {
            //get token from cookie
            token = req.cookies.token;

            //verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await User.findById(decode.userId).select('-password');
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({ message : "not autherized, token failed" });
        }
    }

    if(!token) {
        res.status(401).json({ message : "Not authorized, no token" })
    }
};


//admin middleware
export const adminMiddleware = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else{
        res.status(403).json({ message : "Access denied"})
    }
}
export default protect;