const express = require('express');
const router = express.Router();
const db  = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("./auth");
 
 
router.post('/login', loginValidation, (req, res, next) => {
    
  db.query(
    `SELECT * FROM login WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!'
        });
      }
      // console.log(req.body.password)
      // console.log()
      
      // check password
          
          if (req.body.password === result[0]['password']) {
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
            result[0].token = token;
            db.query(
              `UPDATE login SET login_Status = now() WHERE id = '${result[0].id}'`,
              `UPDATE login SET token = ${token}'`
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
            
          }
          // console.log(res)
          
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );

  // router.post("/welcome1", (req, res) => {
  //   const token = req.body.token;
  //   console.log(token)
  //       if (!token) {
  //         return res.status(403).send("A token is required for authentication");
  //       }
  //       try {
  //         const decoded = jwt.verify(token);
  //         req.user = decoded;
  //       } catch (err) {
  //         return res.status(401).send("Invalid Token");
  //       }
  //       return next();
  //       });

        router.post("/welcome", auth, (req, res) => {
          // console.log(req)
          return res.status(200).send({
          msg: '"Welcome 🙌 "',
          user: req.body
        });
        });


 
module.exports = router;