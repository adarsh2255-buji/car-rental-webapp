import jwt from 'jsonwebtoken'
import User from "../model/userModel.js";
import bcrypt from 'bcrypt'

//USER REGISTRATION
const userRegister = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        const existingUser = await User.findOne({ email });

        //check for existing user
        if(existingUser){
            res.status(401).json({ message : "user already exists"});
        }

        //password hashing
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound) 


        const user = await User.create({
            username, 
            email,
            password : hashedPassword
        })

        res.status(201).json({ message : "User registration successfully"})

    } catch (error) {
        res.status(500).json({ message :"Server error", error})
    }
};


// USER SIGNIN
    const userSignIn = async ( req, res) =>{
       try {
        const { email, password} = req.body
        const user = await User.findOne({ email })
        //no user
        if(!user){
            res.status(401).json({ message: "Invalid user or email"})
        }
        //password matching
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(user && passwordMatch){
            //generate token
            const token = jwt.sign({
                userId : user._id,
                username : user.username,
                email : user.email
            }, process.env.JWT_SECRET, { expiresIn: '1h'});

            // set token as cookie
            res.cookie('token', token, {
                httpOnly : true,
                secure : process.env.NODE_ENV,
                maxAge : 30 * 24 * 60 * 60 * 1000
            })
            res.status(201).json({ message : "user logged in successfully", token})
            return;
        } else{
            res.status(401).json({ message : "Invalide password" })
        }
       } catch (error) {
        res.status(500).json({ message: "internal server error", error})
        return
       }
    }

// USER SIGNOUT

const userSignOut = async(req, res) =>{
    res.cookie('token', "", {
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(200).json({ message : "User signed out successfully"})
}

//GET USER PROFILE

const getUserProfile = async(req, res)=> {
    try {
        const user = {
            userId : req.user._id,
            username : req.user.username,
            email : req.user.email
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message : "Internal server error", error})
    }
}
  
export default {userRegister,
    userSignIn,userSignOut,
    getUserProfile

}; 