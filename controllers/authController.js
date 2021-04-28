const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
   
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
 
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true});
 
  // Remove password from output
  user.password = undefined;
 
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
exports.login = catchAsync(async (req, res, next) => {                                                                                                      
  
    const { Email, Password } = req.body;
    
  
    // 1) Check if email and password exist
    
    if (!Email || !Password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ Email }).select('+Password');
    
    
    if (!user || !(Password === user.Password)) {
        
        return next(new AppError('Incorrect email or password', 401));
    }
    
  
    // 3) If everything ok, send token to client
    
    createSendToken(user, 200, res);
});