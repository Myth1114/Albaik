const express = require("express");
const ProductsController = require("./../controllers/ProductsController");
const AuthController = require(`${__dirname}/../controllers/authController`);
const ordersController = require(`./../controllers/ordersController.js`);
const category=["/restaurant","/drinks","/mojito","/crushers","/twister","/burger","/friedChicken","/bucket","/boxMeal","/fries","/momo","/cutlet","/gap"];
//const products = require("./../models/productsModel");

const ProductsRouter = express.Router(); // refractor
//const catchAsync = require("./../utils/catchAsync");

// const getAllProducts = async (req, res) => {
//   // TODO refractor this into a module
//   const product = await products.find();
//   res.json({ message: "success", product });
// };
// const getByCategory = catchAsync(async (req, res) => {
//   // TODO refractor this into a module
//   const product = await products.find({ category: req.path.substring(1) });
//   console.log(req.path.substring(1));
//   res.status(200).json({ status: "success", product });
// });
ProductsRouter.route(["/allItems","/"])
  .get(ProductsController.getAllProducts)
  .post(ProductsController.createProduct);

ProductsRouter.route(category).get(ProductsController.getByCategory);
//ProductsRouter.route("/drinks").get(ProductsController.getByCategory);
//ProductsRouter.route("/mojito").get(ProductsController.getByCategory);
//ProductsRouter.route("/crushers").get(ProductsController.getByCategory);

ProductsRouter.route("/orders")
  .get(AuthController.protect,ordersController.getOrders)
  .post(AuthController.protect,ordersController.createOrders);
   ProductsRouter.route("/orders/getMyOrders")
  .get(AuthController.protect,ordersController.getMyOrders)
  
ProductsRouter.route([category]).get(ProductsController.getByCategory);
ProductsRouter.route("/:id")
  .get(ProductsController.getByID)
  .patch(ProductsController.updateProduct)
  .delete(
    AuthController.protect,
    AuthController.restrictTo("admin", "lead-guide"),
    ProductsController.deleteProduct
  ); // id should be place in last while routing
  ProductsRouter.route('/orders/:id').get(AuthController.protect,  ordersController.getOrderById)
module.exports = ProductsRouter;
