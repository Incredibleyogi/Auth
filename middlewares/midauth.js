
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        const token =  req.body.token || req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided, authorization denied"
            });
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
            next();
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is not valid"
            });
        }
    
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

//for Student
exports.isStudent= (req, res, next) => {
    try{
    if (req.user.role !== 'Student') {      //might be student or Student
        return res.status(401).json({
            success: false,
            message: "This is a protected route for student"
        });
    }
     next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not a Student"
        });
    }
   
   
}

//for Admin
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== 'Admin') {      
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admin"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not an Admin"
        });
    }
}
