const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const { json } = require("express");
const mailgun = require("mailgun-js");
const DOMAIN = "sandboxe70b4afa55dd40b8a50f7066d79f7d6e.mailgun.org";
const mg = mailgun({
  apiKey: "c4ca876fdfb9ec20b537df8dcd95a762-3d0809fb-19d680b5",
  domain: DOMAIN
})
// a function to create token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // cookie is a small txt doc sent to/fro browser that can store data ...we store our jwt here
  // sending a cookie with response
  const cookieOptions = {
    expires: new Date( // cookie expiry
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true // cookie transaction store only in the http
  };
  user.token=token;
  Object.assign(user,token)
  
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  // this is for o/p  we dont use save() as it would save this modified password on db..
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  //console.log(user.isAdmin)
  console.log(user)
  res.status(statusCode).json(  user
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email,
  //  // isAdmin: user.isAdmin,
  //   token
    );
};

// creating a user document in db
exports.signUp = catchAsync(async (req, res, next) => {
  // const newUser = await User.create(req.body);
  // do not use the above code to signin users as any one can change the role inside the req.body (hack)
  // any one can make themselves admin as the schema is flexible
  // instead pass an object taking only the essential data from the req.body and pass that ..
  const newUser = await User.create({
    // taking away the flexiblity of the schema to remove the above vulnerablity
    //! there should be obects // ({  })
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role
  });
  // const confirmUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/users/confirmPassword/${newUser._id}`;
  // const message = `click this link to verify your email ${confirmUrl}  ,
  //  if you didnot signup then ignore this message`;
  // todo send a mail to the newUser email with newUser id as params
  // try {
  //   await sendEmail({
  //     email: newUser.email,
  //     subject: "your email confirmation is valid for 1 day ",
  //     message
  //   });
  
  // } catch (error) {
  //   return next(
  //     new AppError(
  //       "there was an error sending the email. please try again later",
  //       500
  //     )
  //   );
  // }
  const confirmUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/confirmEmail/${newUser._id}`;
  console.log("this is url",confirmUrl)
  const message = `click this link to verify your email ${confirmUrl}  <a href=${confirmUrl}>confirm</a> ,
   if you didnot signup then ignore this message`;
   const data = {
    from: "NepalALbaik@gmail.com",
    to: `${newUser.email}`,
    subject: "Hello please confrim your email",
    text:message ,
    html:  `click this link to confirm : <a href='${confirmUrl}'> ${confirmUrl}</a>` 
  };
  mg.messages().send(data, function(error, body) {
    console.log(body);
  });
  console.log(req.body)
  res.json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    
    token: signToken(newUser._id),
  })
  // creating a token to login the user since the user is already created we dont need to verify
  //sendToken(newUser, 200, res);
  // const token = signToken(newUser._id);
  // res
  //   .status(200)
  //   .json({ status: 'success', token, data: { newUser: newUser } });
});

// create a fxn for login
exports.signIn = catchAsync(async (req, res, next) => {
  // get the data from the post requrest and verify if:
  const { email, password } = req.body;
  console.log(req.body);
  // the email and the password given if not then throw error
  if (!email || !password) {
    return next(new AppError(`either email or password missing`, 400));
  }
  // check if the email exists in db and password is correct
  const user = await User.findOne({ email }).select("+password"); //! retruns the user with the email
  if (!user) {
    return next(
      new AppError("email not found in records please sign up first ", 401)
    );
  }
  console.log(">>>>>>>",user.password, await user.correctPassword(password, user.password));
  // the fields hidden in the schema need to be explicitly selected since they wont show up in query by default
  // todo create a instant method in schema to check pw and call it here;
  if (!(await user.correctPassword(password, user.password))) {
   
    return next(new AppError("your given password is wrong ", 401));
  }
  console.log(user, password);
  // const result = await user.correctPassword(password, user.password);
  // console.log(result);
  // if (!user || result === false) {
  //   // instant methods neednot be imported..they are available on each docs from as schema methods(hence the name)
  //   return next(new AppError(`the email or password not correct`, 401));
  // }
  console.log(email);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    
    token: signToken(user._id),
  })
  //sendToken(user, 200, res);
  // const token = signToken(user._id);
  // // if every thing is okay then send the token to the user
  // res
  //   .status(200)
  //   .json({ status: 'success', message: 'logged in', token, user });
});
exports.profile = catchAsync(async (req, res, next) => {
  console.log(req.user,"........")
  sendToken(req.user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // check if the token exist by checking thecking in the headers
  let token;
  // console.log('******', req.headers.authorization.split(' ')[1]);
  console.log(req.headers.authorization.split(" ")[1]);
  if ( req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token,"weweweewe");
  }
  if(!token) {
    return next(
      new AppError("you are not logged in ...please log in ", 401)
    );
  }
  // verfiy token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  const freshUser = await User.findById(decoded._id);
  if (!freshUser) {
    return next(new AppError(`user doesnot exist for token .`, 401));
  }
  // check if the password changed after the signin
  if (freshUser.changedPasswordAfter(decoded.iat) === true) {
    return next(new AppError(`the password changed during the session`, 401));
  }

  // if(freshUser.active!==true)
  // {
  //   return next(new AppError("please confirm your email first"));
  // }
  // grant user access to protected routes
  req.user = freshUser;
  console.log('user',req.user)
  next();

});

exports.restrictTo = function(...roles) {
  return (req, res, next) => {
    console.log("req.user", req.user);
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you are not allowed this action", 401));
    }
    next();
  };
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user based on posted
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with this email address", 401));
  }
  // generate the random reset token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // send it to user email
  // todo build the reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `if you forgot your password then submit a patch request with password and confirmPassword at ${resetUrl}  ,
   if u did not forget your password then ignore this message`;
  console.log(resetUrl);
  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset token valid for 10 mins",
      message
    });
    res.status(200).json({
      status: "success",
      message: "token sent to the Email"
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "there was an error sending the email. please try again later",
        500
      )
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  console.log(typeof req.params.id);
  const hashedToken = JSON.stringify(req.params.id);
  const user = await User.findOne({
    passwordResetToken: req.params.id,
    passwordResetExpires: { $gt: Date.now() }
  });
  console.log("this is the token ", user);
  if (!user)
    return next(new AppError("the token is invalid or has expired", 500));
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  sendToken(user._id, 200, res);
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  //   data: { user: user }
  // });
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  // user.req signed in user
  const user = await User.findById(req.user.id).select("+passwoed");
  if (
    (await user.correctPassword(req.body.currentPassword, user.password)) ===
    false
  ) {
    return next(new AppError("your given password is wrong ", 401));
  }
  //  if(!(await User.correctPassword(req.body.password,user.password)){
  //    return next(new AppError("your given password is wrong ",401));
  //  }
  user.password = req.body.password;
  user.confirmPassword = req.body.password;
  await user.save();
  // do not use findandupdate for pw related stuff ..it doesnot run validators and pre middlewares

  sendToken(user, 200, res);
});

exports.logOut = catchAsync(async (req, res, next) => {
  // check if the user is logged in first..then send empty token to log out the user
  const cookieOptions = {
    expires: new Date( // cookie expiry
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )
  };

  res.cookie('jwt', 'logged out', cookieOptions);
  res.status(200).json({status:"success"})
});