import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


export const authMiddleware = (req, res, next) => {
    // console.log("req.user:", req.user);
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ msg: 'No token, Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);
    if(!mongoose.Types.ObjectId.isValid(decoded.user.id)) {
      return res.status(401).json({ msg: 'Invalid token.' });
    }
    req.user = decoded.user; // { id: user.id }
    next();
  } catch (err) {
     // console.error("JWT Error:", err.message);
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};