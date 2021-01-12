const products = require("./../models/productsModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllProducts =catchAsync( async (req, res) => {
  
  const product = await products.find();
  res.json(product);
});
exports.getByCategory = catchAsync(async (req, res) => {

 // console.log("id is ", req.params.id);
 
  const product = await products.find({ category: req.path.substring(1) });
  console.log(product)

  res.status(200).json(product);
});
exports.getByID = catchAsync(async (req, res, next) => {
  // TODO refractor this into a module
  //console.log("id is ", req.params.id);
  const product = await products.findById(req.params.id);
  console.log(req.params.id);
  res.status(200).json( product);
});
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await products.create(req.body);
  // await modelName.create(obj) to create docs (returns promise(created document))

  res.status(200).json({
    status: "success",
    product: newProduct
  });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await products.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, // returns the modified document and not the original
      runValidators: true // reruns all the validations we specified in the schema
    }
  );
  if (!updatedProduct) {
    return next(
      new AppError(`no such product with ${req.params.id} found `, 404)
    );
  }
  console.log(updatedProduct);
  res.status(200).json({
    status: "success",
    data: {
      updatedProduct
    }
  });
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await products.findByIdAndDelete(req.params.id);
  if (product === false) {
    return next(
      new AppError(`no such product with ${req.params.id} found `, 404)
    );
  }
  res.status(200).json({
    status: "success"
  });
});
