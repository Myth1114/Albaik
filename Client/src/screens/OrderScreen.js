import React,{useEffect} from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {getOrderDetails} from '../actions/orderActions'
import moment from 'moment'

const OrderScreen = ({ match }) => { 
    const orderId = match.params.id;
    console.log("order ID",match.params.id)
    
    const dispatch =useDispatch()
    
    const orderDetails = useSelector(state => state.orderDetails)
    console.log("order details",orderDetails)
    const {order,loading,error}= orderDetails
    console.log(".....",order)

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(
          order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      }

    useEffect(()=>{
        dispatch(getOrderDetails(orderId))
        // eslint-disable-next-line
    },[])

  
    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
    :<> 
    <h5>Order {order._id}</h5>
    <Row>
        <Col md={8}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
            <h3>Shipping</h3>
            <p>
                <strong>Name: </strong> {order.UserId.name}
            </p>
            <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.UserId.email}`}>{order.UserId.email}</a>
            </p>
            <p>
                <strong>Address-</strong>
                {order.shippingAddress.address}{''},
                {order.shippingAddress.city}{''},
                {order.shippingAddress.number}
            </p>
            {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {moment(order.paidAt).format('YYYY-MM-DD')}
                </Message>
            ) : (
                <Message variant='danger'>Not Delivered</Message>
            )}
            </ListGroup.Item>

            <ListGroup.Item>
                <h3>Payment Method</h3>
                <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                </p>
                {order.isPaid ? ( 
                    <Message variant='success'>Paid On {moment(order.paidAt).format('YYYY-MM-DD')}</Message>
                ):(
                    <Message variant='danger'>Not Paid</Message>
                )}
            </ListGroup.Item> 
            <ListGroup.Item>
                {order.orderItems.length === 0 ? 
                    <Message>Empty Order</Message>:(
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item,index) => (
                               <ListGroup.Item key={index}>
                                   <Row>
                                       <Col>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                       </Col>
                                       <Col>
                                            <Link to={`/product/${item.product}`}>
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

            <Col md={4} >
                <Card className="order">
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>Rs.{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Delivery Charge</Col>
                                <Col>Rs.{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Service charge</Col>
                                <Col>Rs.{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>Rs.{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>   
                        
                        </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}
export default OrderScreen


