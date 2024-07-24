const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model')

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
             return res.status(401).json({
               status: "failed",
               message: "Unauthorized - No Token Provided",
             });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
             return res.status(401).json({
               status: "failed",
               message: "Unauthorized - Invalid Token",
             });
        }

        const user = await UserModel.findById(decoded.userId).select("-password");

        if (!user) {
               return res.status(404).json({
                 status: "failed",
                 message: "User not found",
               });
        }

        req.user = user;

        next();

    } catch (error) {
         console.log(error.message);
         res.status(500).json({
           status: "failed",
           message: "Internal Server Error",
         });
    }
}

module.exports = protectedRoute;