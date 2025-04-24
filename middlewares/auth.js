const {verifyToken} = require('../utils/jwt');

function requireLogin(req, res, next) {
   const token = req.cookies.token;
   if (!token){
        return res.status(401).json({error: "Unauthorized"});
   }
   try {
     const data = verifyToken(token);
     req.user = data;
     next();
   } catch (err) {
     console.error("JWT verification failed:", err);
     res.status(401).json({ error: "Unauthorized" });
   }
}


module.exports = {requireLogin};