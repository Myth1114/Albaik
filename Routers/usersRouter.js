const express = require("express");
const User = require("./../models/userModel");

const Router = express.Router();
const UserController = require(`${__dirname}/../controllers/userController`);
const AuthController = require(`${__dirname}/../controllers/authController`);
Router.route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUsers);

Router.route("/googleLog").post(UserController.googleLogin)
Router.route("/signup").post(AuthController.signUp);
Router.route("/signIn").post(AuthController.signIn);
// Router.route("/logOut").get(AuthController.protect,AuthController.logOut);
Router.route("/profile").get(AuthController.protect, AuthController.profile);
Router.route("/forgotPassword").post(AuthController.forgotPassword);
Router.route("/resetPassword/:id").patch(AuthController.resetPassword);
Router.route("/confirmEmail/:userid").get(UserController.confirmEmail);
Router.post("/googleLogin",UserController.googleLogin)

Router.patch(
  "/updateMyPassword",
  AuthController.protect,
  AuthController.updatePassword
);
Router.route("/updateMe").patch(
  AuthController.protect,
  UserController.updateMe
);
Router.route("/deleteMe").delete(
  AuthController.protect,
  UserController.deleteMe
);
// handling routes for users // mounting the routes on the routes

Router
  .route('/profile')
  .get(AuthController.protect,UserController.getUserProfile)

Router.route("/:id")
  // .get(UserController.getUser)
  .get(AuthController.protect,UserController.getUserById)
  .delete(UserController.deleteUser)
  .patch(UserController.updateUser);
  
module.exports = Router;


