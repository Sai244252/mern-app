import jwt from "jsonwebtoken";

import User from "../models/User.js";

import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Readt JWT from cookies

  token = req.cookies.jwt;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);

    throw new Error("Not authorized, no token found.");
  }
});

export { authenticate };
