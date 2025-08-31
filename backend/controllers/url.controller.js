import { nanoid } from "nanoid"
import { Url } from "../models/url.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import QRCode from "qrcode"

dotenv.config({})

const generateToken = (userId) => {
  return  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", 
  });
};


const generateShortUrl = async (req, res) => {
    try {
        const originalUrl = req.body.url;

        if (!originalUrl) {
            return res.status(400).json({
                message: "Original url not found",
                success: false
            })
        }

        const existing = await Url.findOne({originalUrl});

        if(existing) {
          return res.status(400).json({
            success:false,
            message:"Url has been already shorten. Please check it"
          })
        }

        const shortId = nanoid(8);

        const qrUrl = `http://localhost:3000/${shortId}`;

        const qrCodeImg = await QRCode.toDataURL(qrUrl);
        

        const newUrl = await Url.create({
            originalUrl,
            shortId,
            qrCodeImg,
            user:req.user._id,
        })

        return res.status(200).json({
            message: "shortId generated successfully",
            success: true,
            newUrl,
            qrCodeImg
        })
    } catch (error) {
        console.log(error)
    }

}

const loginUser = async(req,res) => {
  try {
    const {email,password} = req.body
    // console.log(email,password)
  
    if(!email || !password){
      return res.status(400).json({
        message:"Alldields are required",
        success:false
      })
    }
  
    const user = await User.findOne({email});
    // console.log(user)
    if(!user){
      return res.status(400).json({
        message:"Invalid email or password",
        success:false
      })
    }
  
    const passwordvalidate = await user.isPasswordCorrect(password)
    if(!passwordvalidate){
      return res.status(401).json({
        message: "Invalid email or password." ,
        success:false
      });
    }
    // console.log(passwordvalidate)

    const token = generateToken(user._id);

    // console.log(token)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
  
    const { password: _, ...userData } = user.toObject();
      res.status(200).json({
        message: "Login successful",
        user: userData,
        token,
      });
    
  } 
  catch (error) {
    res.status(500).json({ 
      message: "Internal Server error" 
    });
  }
}


const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const newUser = await User.create({ name, email, password });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: _, ...userData } = newUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ 
      message: "Server error" 
    });
  }
};


const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 
    // console.log(req.user)

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};



const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const editUser = async(req,res) => {
  try {
    const { name } = req.body;
    const userId =req.user._id;

    if(!userId){
      return res.status(400).json({message:"User Id not found"})
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      {
        new:true,runValidators: true
      }
    );

    return res.status(200).json({
      message:"User updated successfully.",
      success:true,
      user
    })

  } catch (error) {
    return res.status(500).json({
      message:"User not updated Internal error",
      success:false
    })
  }
}




const routeToShortID = async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      },
      { new: true } 
    );

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    return res.redirect(entry.originalUrl);
  } catch (error) {
    console.error("Error in routeToShortID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getUserUrls = async (req, res) => {
    try {
        const urls = await Url.find({user:req.user._id})

        return res.status(200).json({
            message: "urls getting successfully",
            success: true,
            urls,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while get all url not working",
            success: false
        })
    }
}

export { 
  generateShortUrl, 
  routeToShortID, 
  getUserUrls, 
  loginUser, 
  signupUser, 
  logoutUser, 
  getUserProfile,
  getCurrentUser,
  editUser
}