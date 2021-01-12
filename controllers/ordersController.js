const orders = require("./../models/ordersModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.createOrders = catchAsync(async (req, res, next) => {
  //   console.log(req,req.body)
    
  // req.body.UserId = req.user.id;
  // const order = await orders.create(req.body);

  // res.status(200).json({
    
  //   order
  // });
  
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  req.body.UserId=req.user._id;
console.log(req.body)

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new orders({
      orderItems:orderItems,
      userId: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    console.log(req.body);

    const createdOrder = await orders.create(req.body);
    console.log("JJJJJJ",createdOrder)

    res.status(201).json(createdOrder)
  }
})

// exports.getOrderById = catchAsync(async (req, res, next) => {
//     console.log(req.user.id)
//   const order = await orders.find({ id: req.params.id }).populate({
//     path: "OrderItems",
//     select: "-_id -numReviews -countInStock -rating -category -price -description -image -UserId"
//   }).populate({
//     path:"UserId"
//   });

//   res.status(200).json({order});
//   // res.status(200).json(AllOrders);
// })

exports.getOrderById = catchAsync(async (req, res,next) => {
  console.log("running")
  const order = await orders.findById(req.params.id).populate({
    path:'UserId',
   select: 'name email'
  }
  )
  console.log("this is the order",order);

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
exports.getOrders = catchAsync(async (req, res,next) => {
  const order = await orders.findById(req.params.id).populate({
    path:'User',
   select: 'name email'
  })
  res.json(orders)
})
exports.getMyOrders = catchAsync(async (req, res) => {
  console.log("cccccccccccccccccccccc",req.user)
  const order = await orders.find({UserId:req.user._id})
  console.log(order)
  res.json(order)
})


