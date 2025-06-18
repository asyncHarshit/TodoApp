import User from "../model/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// ✅ Generate JWT Token
const generateToken = (getId) => {
  return jwt.sign({ getId }, process.env.JWT_SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60 // 3 days
  });
};

// ✅ Register a User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(401).json({
        message: "User already exists",
        success: false
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token and set cookie
    const token = generateToken(newUser._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false
    });

    // Send success response
    return res.status(201).json({
      message: "User created successfully!",
      name: newUser.name,
      email: newUser.email,
      id: newUser._id
    });

  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      message: "Error in registerUser"
    });
  }
};

// ✅ Login a User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Wrong password!",
        success: false
      });
    }

    // Generate token and set cookie
    const token = generateToken(user._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false
    });

    // Send success response
    return res.json({
      message: "Logged in successfully",
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({
      message: "Error in loginUser"
    });
  }
};

// ✅ Logout a User
const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    withCredentials: true,
    httpOnly: false
  });

  return res.json({
    success: true,
    message: "Logout successfully!"
  });
};

export { registerUser, loginUser, logoutUser };