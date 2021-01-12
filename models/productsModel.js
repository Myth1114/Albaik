const mongoose = require("mongoose"); // mongoose package
const validator = require("validator");
// creating moongse schema (object)
const slugify = require("slugify");

const productsSchema = new mongoose.Schema({
  // name: String,
  name: {
    // schema options (validations) inside obj
    type: String,
    required: [true, "a tour must have a name"], // set the field as require and unique
    unique: true,
    trim: true,
    minlength: [10, "tour name should be atleast 10 characters"], // validator for string
    maxlength: [40, "tour name should not be more than 40 chars"] // validator for string
    // validate: [validator.isAlpha, 'names should only contain characters'] // validator npm library
  },
  category: {
    type: String,
    required: [true, "A product must have category"],
    enum: {
      // validtor for string
      values: ["burger", "chicken", "mojito"],
      message: "wrong category"
    }
  },
  rating: {
    type: Number,
    default: 4.5, // set the default value for the filed
    min: [1, "rating should not be below 1"], // validator for numbers and dates
    max: [5, "rating should not be above 5"] // validator for numbers and dates
  },

  numReviews: {
    type: Number,
    default: 0
  },

  price: {
    required: true,
    type: Number
  },

  description: {
    required:true,
    type: String,
    select:true
  },
  countInStock: {
    type: Number,
    required: true
  }

  // properties should be defined in schema beforehand unlike classes
});

const Product = mongoose.model("Product", productsSchema);
// mongoose.model(collectionname,schema)
module.exports = Product;
