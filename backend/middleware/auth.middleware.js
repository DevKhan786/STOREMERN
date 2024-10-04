import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// protect route
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized: Admin Only" });
    }
  } catch (error) {
    console.log("Error in adminRoute middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
