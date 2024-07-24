const UserModel = require("../models/user.model")


exports.allUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const users = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json({
            status: 'success',
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          status: "failed",
          message: "Internal Server Error",
        });
    }
}