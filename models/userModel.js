const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt'); // encryption package
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
    maxlength: [40, "please enter shorter name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "please enter an email id"],
    //unique: true,
    lowercase: true,
    validate: [validator.isEmail, "enter a valid email"]
  },
  photo: String,

  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: 6,
    // validate:validator.isStrongPassword
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, "please enter confirmation password"],
    validate: {
      // it works only on save and create
      // save => create doc and update doc
      validator: function(el) {
        return el === this.password; // will return boolean...false is error
        // this var points to the schema itself i.e doc
      },
      message: " the passwords do not match..try again"
    }
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ["admin", "lead-guide", "guide", "user"]
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    
  }
});
// write a code to encript user pw (salt and hash)
// manipulatin data before save
UserSchema.pre("save", async function(next) {
  // isModified is a method on each of the fields in a doc to check if the field is  modified
  if (!this.isModified("password")) return next();
  // this var points to the doc before save
  this.password = await bcrypt.hash(this.password, 12);
  // higher the post param higher hash time and better salting & hashing
  // delete the confirm password field which is non hashed and not needed in user db
  this.confirmPassword = undefined;
});
UserSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 3000;
  next();
});
UserSchema.pre(/^find/, function(next) {
  //in query hook this refers to the query returned from the document works on find
  this.find({ active: { $ne: false } });
  next();
});
//this method returns true if the given pw in form and db pw are matched else false
// UserSchema.methods.correctPassword = catchAsync(async function(givenpw, dbpw) {
//   //console.log(await bcrypt.compare(givenpw, dbpw));
//   return await bcrypt.compare(givenpw, dbpw);
// });
UserSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

// creating password reset token
UserSchema.methods.createPasswordResetToken = async function() {
  // create a reset token using built in cryto package

  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = await bcrypt.hash(resetToken, 12);
  // this.passwordResetToken=//.createHash('sha265')
  //   //.update(resetToken)
  //   //.digest('hex');
  console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return this.passwordResetToken;
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
