const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid User Data",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Password and Confirm Password does not match.",
      });
    }

    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "Username already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new UserModel({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        status: "success",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Invalid User data",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) { 
       return res.status(400).json({
         status: "failed",
         message: "Invalid User Credentials",
       });
    }

    const user = await UserModel.findOne({ username: username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
       return res.status(400).json({
         status: "failed",
         message: "Invalid username or password",
       });
    }

    generateToken(user._id, res);

    res.status(200).json({
      status: "success",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic
      }
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      status: "success",
      message: "Successfully logged out"
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

