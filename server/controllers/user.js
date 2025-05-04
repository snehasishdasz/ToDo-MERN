const User = require("../models/userModel");
const { generateToken, verifyToken } = require("../utils/jwt");


// Function to register a new user
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                error: "Please fill all the fields",
            });
        }

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({error:"User already registered"});
        }

        let createdUser = await User.create({
            fullName,
            email,
            password,
        });
        const token = generateToken(createdUser); // use your function
        res.cookie("token", token); // set token as cookie

        return res.status(201).json({
            success: true,
            message: "User registered successfully!🥳🎉",
            user: createdUser,
            token: token,
        });

    }
    catch (error) {
        console.error("Error in register function:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Function to login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!email || !password) {
            return res.status(400).json({
                error: "Please fill all the fields",
            });
        }

        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials",
            });
        }

        let isMatch = await user.comparePassword(password);

        if (isMatch) {
            const token = generateToken(user);
            res.cookie("token", token);
            return res.status(200).json({
              success: true,
              message: "Login successful🥳🎉",
              user: user,
              token: token,
            });
        } else {
            return res.status(401).json({
              error: "⚠️Invalid credentials⚠️",
            });
        }
    }
    catch (error) {
        console.error("Error in login function:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Function to logout a user
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Error in logout function:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

//Function to fetch the loggedin user data
const getUserData = async (req, res) => {
    try{
        const userID = req.user.userId;
        const user = await User.findById(userID).select("-password -__v");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            user:user,
        });
    }
    catch (error) {
        console.error("Error in getUserData function:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = { register, login, logout, getUserData };