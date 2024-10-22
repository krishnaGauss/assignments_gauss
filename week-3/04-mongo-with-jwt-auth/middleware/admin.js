const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
const JWT_SECRET_KEY = "NNINDINW**D*W)U@@()(EU(ENwefnwifniwef))";

// Middleware for handling auth
async function adminMiddleware(req, res, next){
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try{
    const payload = req.headers.authorization;
  const jwt_token = payload.split(" ");

  if (jwt_token[0] === "Bearer") {
    jwt.verify(jwt_token[1], JWT_SECRET_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      console.log(user)
      const username=user.username;
      const password = user.password;

      const response = await Admin.findOne({
        username,
        password,
      });
      if (!response) {
        return res.status(400).send("Admin does not exist.");
      } 
      next();
    });
  } else{
    res.status(401).json({ message: 'Authorization token required' });
  }}
  catch(err){
    console.error('Error fetching data:', err);
  }
}

module.exports = adminMiddleware;
