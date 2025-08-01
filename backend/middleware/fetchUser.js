// var jwt = require('jsonwebtoken');
// const JWT_SECRET = 'mynotesismy3rdreactApp';

// const fetchUser = (req,res,next) => {
//   // Get the user from the jwt token and add id to req object
//   const token = req.header('auth-token');
//   if(!token){
//    return res.status(401).send({error: "Please authenticate using a valid token"});
//   }
//   try {
//    const data = jwt.verify(token, JWT_SECRET);
//   req.user = data.user;
//    next();
//   } catch (error) {
//    res.status(401).send({error: "Please authenticate using a valid token"});
//   }
  
// }

// module.exports = fetchUser;

var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mynotesismy3rdreactApp';

const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    // Optional: Log to confirm
    // console.log("Token payload:", data); 
    req.user = data.user;
    next(); 
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
