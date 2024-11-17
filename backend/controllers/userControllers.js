const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const { randomUUID } = require("crypto");
const nodemailer = require("nodemailer");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for registration",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return next(new HttpError("Fill in all fields.", 422));
    }
    const newEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email Already Exists.", 422));
    }
    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters.", 422)
      );
    }
    if (password != password2) {
      return next(new HttpError("Passwords do not match.", 422));
    }

    const otp = generateOTP();
    await sendOTP(newEmail, otp);

    // Store user data and OTP in session
    req.session.pendingUser = { name, email: newEmail, password, otp };
    await req.session.save();

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Registration error:", error);
    return next(new HttpError("User Registration Failed.", 422));
  }
};

const verifyOTPAndRegister = async (req, res, next) => {
  try {
    const { otp } = req.body;
    if (!req.session || !req.session.pendingUser) {
      return next(new HttpError("No pending registration found.", 422));
    }
    const pendingUser = req.session.pendingUser;

    if (otp !== pendingUser.otp) {
      return next(new HttpError("Invalid OTP.", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pendingUser.password, salt);
    const newUser = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: hashedPass,
    });

    // Clear the pending user data
    delete req.session.pendingUser;
    await req.session.save();

    res.status(201).json(`New user ${newUser.email} registered.`);
  } catch (error) {
    console.error("OTP verification error:", error);
    return next(new HttpError("User Registration Failed.", 422));
  }
};

//==============================LOGIN A REGISTERED USER
//POST: api/users/login
//UNPROTECTED
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Fill in all fields.", 422));
    }
    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("invalid credentials.", 422));
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return next(new HttpError("invalid credentials", 422));
    }

    const { id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(
      new HttpError("Login failed. please check your credentials.", 422)
    );
  }
};

//==============================USER PROFILE
//POST: api/users/:id
//PROTECTED
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//==============================CHANGES USER AVATER(PROFILE PICTURE)
//POST: api/users/change-avatar
//PROTECTED
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("please choose an image.", 422));
    }

    //find user from database
    const user = await User.findById(req.user.id);
    //delete old avatars if exists
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;
    //check file size
    if (avatar.size > 500000) {
      return next(
        new HttpError("profile picture is too big. should be less than 500kb"),
        422
      );
    }

    let fileName;
    fileName = avatar.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    avatar.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }
        const updatedAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFilename },
          { new: true }
        );
        if (!updatedAvatar) {
          return next(new HttpError("Avatar could not be changed.", 422));
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

//==============================CEDIT USER DETAILS(FROM PROFILES)
//POST: api/users/edit-user
//PROTECTED
const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;
    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    // get user from database

    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new HttpError("user not found.", 403));
    }
    // make sure new email doesn't already exist

    const emailExist = await User.findOne({ email });

    // we want to update other details with/without changing the email (which is a unique id because we use it to login).

    if (emailExist && emailExist._id != req.user.id) {
      return next(new HttpError("Email already exist.", 422));
    }
    //compare current password to db password
    const validateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!validateUserPassword) {
      return next(new HttpError("invalid current password", 422));
    }

    //compare new password
    if (newPassword !== confirmNewPassword) {
      return next(new HttpError("new passwords do not match.", 422));
    }
    //hash new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    //update user info in database
    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password: hash },
      { new: true }
    );
    res.status(200).json(newInfo);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//==============================Get Authors
//POST: api/users/authors
//UNPROTECTED
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    res.json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const otpStorage = new Map();

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    const otp = generateOTP();
    await sendOTP(email, otp, "Your OTP for Password Reset");

    otpStorage.set(email, { otp, timestamp: Date.now() });

    res
      .status(200)
      .json({ message: "OTP sent to your email for password reset." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return next(
      new HttpError("Failed to process forgot password request.", 500)
    );
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, otp } = req.body;
    if (!email || !newPassword || !otp) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    const storedData = otpStorage.get(email);
    if (!storedData) {
      return next(new HttpError("No OTP request found.", 422));
    }

    // Check if OTP is expired (e.g., after 10 minutes)
    if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
      otpStorage.delete(email);
      return next(new HttpError("OTP has expired.", 422));
    }

    if (storedData.otp !== otp) {
      return next(new HttpError("Invalid OTP.", 422));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);

    user.password = hashedPass;
    await user.save();

    // Clear the OTP data
    otpStorage.delete(email);

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Password reset error:", error);
    return next(new HttpError("Password reset failed.", 500));
  }
};

module.exports = {
  resetPassword,
  forgotPassword,
  registerUser,
  verifyOTPAndRegister,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
