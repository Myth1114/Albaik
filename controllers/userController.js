const Users = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(
  "973749724858-jfq1ig87hkd296g50kkk3g4845l66hn3.apps.googleusercontent.com"
);

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await Users.find();
  // await modelName.create(obj) to create docs (returns promise(created document))

  res.status(200).json({
    results: allUsers.length,
    status: "success",
    allUsers
  });
});
exports.confirmEmail = catchAsync(async (req, res, next) => {
  // id: new ObjectID(req.params.id)
 
  console.log(req.params, "userid");
  const user = await Users.findByIdAndUpdate(req.params.userid, {
    active: true
  });
  console.log(user,req.body, "results");

  // user.active = true;
  // user =await user.save();

  res.status(200).json({ message: "success", user });
});

// exports.googleLogin = catchAsync(async (req, res, next) => {
//   conaole.log("running")
//   console.log(req.body)
//   const { tokenId } = req.body;
 

 

//   console.log(req.body.response.xc.id_token, "req.body");
//   const verification = await client.verifyIdToken({
//     idToken: tokenId,
//     audience:
//       "862858924241-sjjp5n9olccilcpdjrug8fnukla75chh.apps.googleusercontent.com"
//   });
//   console.log(verification, "verification");
//   const { email_verified, email, name } = verification.payload;
//   console.log("status", email_verified);
//   // eslint-disable-next-line camelcase
//   if (email_verified) {
//     const user = await Users.findOne({ email: email }).exec();
//     console.log(user, "the user");
//     if (user) {
//       const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//       });
      
//       // const { _id, name, email } = user;
//       console.log(token)
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,

//         token:token
//       });
//     } else {
//       const password = email + 123456789;
//       const confirmPassword = password;
//       // todo create a new user in the db
//       const newUser = await Users.create({
//         name,
//         email,
//         password,
//         confirmPassword
//       });
//       console.log(newUser);
//       const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//       });
//       res.json({
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,

//         token
//       });
//     }    
//   }
// });
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user POSTs password
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError("you are not allowed to set password on this route", 400)
    );
  }
  // update user document
  // filtered fileds not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await Users.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  // we set active property to false ...we donot delete the user from db we mark them not active
  await Users.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: "success", message: null });
});

exports.createUsers = (req, res) => {
  res.status(500).json({ status: "error", message: "route not defined" });
};

exports.getUserProfile = catchAsync(async (req, res) => {
  const user = await Users.findById(req.user._id)
console.log(user,"ffffffff")
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
exports.getUserById = catchAsync(async (req, res) => {
  const user = await Users.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
exports.deleteUser = (req, res) => {
  res.status(500).json({ status: "error", message: "route not defined" });
};
exports.updateUser = (req, res) => {
  res.status(500).json({ status: "error", message: "route not defined" });
};

exports.confirmEmail = catchAsync(async(res,req,next)=>{
  console.log("ttttttttttttt",req.params.userid)
  const confirmEmail = await Users.findByIdAndUpdate(req.params.userid,{
    active:true
  })
  res.status(200).json({message:"success"})
})





exports.googleLogin = catchAsync(async (req, res, next) => {
  console.log("running");
  const { tokenId } = req.body;
  console.log(req.body, "req.body");
  const verification = await client.verifyIdToken({
    idToken: tokenId,
    audience:
      "973749724858-jfq1ig87hkd296g50kkk3g4845l66hn3.apps.googleusercontent.com",
  });
  console.log(verification, "verification");
  const { email_verified, email, name } = verification.payload;
  console.log("status", email_verified);
  // eslint-disable-next-line camelcase
  if (email_verified) {
    const user = await Users.findOne({ email: email }).exec();
    console.log(user, "the user");
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      // const { _id, name, email } = user;

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,

        token,
      });
    } else {
      const password = email + 123456789;
      const confirmPassword = password;
      // todo create a new user in the db
      const newUser = await Users.create({
        name,
        email,
        password,
        confirmPassword,
      });
      console.log(newUser);
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,

        token,
      });
      // res.status(200).json({ status: "success", newUser });
    }

    // const users = await Users.find({ email });
    // console.log(users,users.length)
    // if (users==null) {
    //   console.log("no users");
    //   return next(new AppError("user not in db", 404));
    // }
  }
  // res.status(400).json({ status: "not found" });
  // .then(  response => {
  //   const { email_verified, name, email } = response.payload;
  //   console.log(response.payload.email,name,email_verified, "the payload");

  //     if (email_verified) {
  //       // checking if the user has logged in previously
  //       // if not then create a new user in the db
  //         Users.findOne({ email }).exec((err, user) => {
  //         if (err) {
  //           return next(new AppError("something went wrong", 400));
  //         }
  //         if (user) {

  //           const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
  //             expiresIn: process.env.JWT_EXPIRES_IN
  //           });
  //           const { _id, name, email } = user;

  //           res.json({
  //             _id: user._id,
  //             name: user.name,
  //             email: user.email,

  //             token
  //           });
  //         } else {
  //           const password = email + 123456789;
  //           const newUser = new Users({ name, email, password });
  //            newUser.save((err, data) => {
  //             if (err) {
  //               return next(new AppError("something went wrong", 400));
  //             }
  //             const token = jwt.sign(
  //               { _id: data._id },
  //               process.env.JWT_SECRET,
  //               {
  //                 expiresIn: process.env.JWT_EXPIRES_IN
  //               }
  //             );
  //             const { _id, name, email } = newUser;
  //             res.json({
  //               _id: user._id,
  //               name: user.name,
  //               email: user.email,

  //               token
  //             });
  //           });
  //         }
  //       });
  //     }
  //   });

  // console.log(tokenId);
});