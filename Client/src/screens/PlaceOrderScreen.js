import React,{useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {createOrder} from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceOrderScreen = ({ history }) => { 
    
    const dispatch =useDispatch()
    const cart = useSelector((state) => state.cart)

     //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(cart.itemsPrice > 0 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)
    
    const orderCreate = useSelector(state => state.orderCreate)
    const {order,success,error}= orderCreate

    useEffect(()=>{
        if(success){
            history.push(`/products/orders/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
         // eslint-disable-next-line
    },[history,success])
   
console.log('adfghj',typeof(cart.cartItems))
  const placeOrderHandler= ()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
        }))
    }
    return(
      <>
    <CheckoutSteps step1 step2 step3 step4/>
        <Row className="placeorder">
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address-</strong>
                        {cart.shippingAddress.address}{''},
                        {cart.shippingAddress.city}{''},
                        {cart.shippingAddress.number}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Payment Method</h3>
                    <strong>Method-{cart.paymentMethod}</strong>
                </ListGroup.Item> 
                <ListGroup.Item>
                    <h3>Order Items</h3>
                    {cart.cartItems.length === 0 ? 
                    <Message>Empty cart</Message>:(
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index) => (
                               <ListGroup.Item key={index}>
                                   <Row>
                                       <Col>
                                        <Image src={item.image} alt={item.name} fluid rounded style={{ width: '6rem',height:'6rem' }}></Image>
                                       </Col>
                                       <Col md={2}>
                                            <Link to={`/products/${item.product}`}>
                                                {item.name}
                                            </Link>
                                       </Col>
                                       <Col md={4}>
                                           {item.qty}x Rs.{item.price}=Rs.{item.qty * item.price}
                                       </Col>
                                   </Row>
                               </ListGroup.Item> 
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
            </Col>

            {/* //Right Side */}

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items Price</Col>
                                <Col>Rs.{cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Delivery Charge</Col>
                                <Col>Rs.{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Service Charge</Col>
                                <Col>Rs.{cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>Rs.{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>   
                        <ListGroup.Item>
                        
                            {error && <Message variant='danger'><Link to="/signIn">{"Click here to Login"}</Link></Message>}
                        </ListGroup.Item> 
                        <ListGroup.Item>
                         <Button
                            type='button'
                            className='btn-block'
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}
                                 >
                             Place Order
                             </Button>
                        </ListGroup.Item>
                        </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    )
}
export default PlaceOrderScreen