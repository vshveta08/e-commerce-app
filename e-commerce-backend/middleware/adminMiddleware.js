const jwt = require('jsonwebtoken')

function adminMiddleware(req, res, next) {
   try {
      const token = req.headers.token;
      const decoded = jwt.verify(token, process.env.jwtSecret);
      if (decoded.email) {
         req.headers.email = decoded.email;
         next();
      }
      else {
         res.status(401).json({
            success: false,
            message: "You are not authenticated!"
         })
      }
   }
   catch (err) {
      res.status(401).json({
         success: false,
         message: "You are not authenticated!"
      })
   }
}

module.exports = adminMiddleware