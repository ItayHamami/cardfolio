const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Take the token from the request
    const token = req.header("Authorization");

    if (!token) {
      console.log("No token provided");
      return res.status(401).send("Access denied. No valid token");
    }

    console.log("Received token:", token);

    // 2. Check the token
    const payload = jwt.verify(token, process.env.jwtKey);
    console.log("Token verified. Payload:", payload);

    // 3. Save the payload
    req.payload = payload;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).send("Access denied. Invalid token");
  }
};



/*
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {
    // 1. take the token from the request
    const token = req.header("Authorization");

    if (!token) return res.status(401).send("Access denied. No valid token");

    // 2. check the token

    const payload = jwt.verify(token, process.env.jwtKey);

 

    // 3. save the payload
    req.payload = payload;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).send("Access denied. Invalid token");
}

};

*/