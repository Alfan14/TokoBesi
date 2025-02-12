import  jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY ;

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          console.log("Jwt",err)
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

export default authenticateJWT;