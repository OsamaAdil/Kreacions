const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // const accessToken = req.headers.authorization?.split(' ')[1];
    const accessToken = req.headers.authorization;
  
    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized - Access token missing' });
    }
  
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden - Access token invalid or expired' });
      }
      req.user = user;
      next();
    });
  };