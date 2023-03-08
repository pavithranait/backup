const { check } = require('express-validator');
 
exports.loginValidation = [
     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 4 or more characters').isLength({ min: 4 })
 
]