import React ,{useEffect}from 'react'
import  {useDispatch,useSelector} from 'react-redux'
import {AddToCart,removeFromCart} from '../actions/cartActions'
import {Row,Col, ListGroup, Button, Form,Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'

const CartScreen = ({match,location,history}) => {
    const productId=match.params.id


    const qty =location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state)=>state.cart)
    const {cartItems}=cart
    
    useEffect(()=>{
        if(productId){
            dispatch(AddToCart(productId,qty))
        }
    },[dispatch,productId,qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler=()=>{
        history.push('/shipping')
    }
 

      return (   
        <Row >
            <Col md={8}>
                <h1>My Cart({cartItems.length})</h1>
                {cartItems.length===0 ?(
                <Message>
                Your Cart is Empty, <Link to='/'>Add Some Items</Link>
                </Message>
                ) : (
                    <ListGroup variant='flush'>
                       {cartItems.map(item => (
                           <ListGroup.Item key={item.product}>
                               <Row className="cartDetails">
                                   <Col md={3}>
                                   <Image src={item.image} alt={item.name} fluid rounded style={{ width: '6rem',height:'6rem' }}></Image>
                                   </Col>
                                   <Col md={2}>
                                   <Link to={`/products/${item.product}`}>{item.name}</Link>
                                   </Col>
                                    <Col md={2}>
                                        Rs.{item.price}
                                    </Col>
                                    <Col md={2}>
                                    <Form.Control className="form"
                                    as='select'
                                    value={item.qty}
                                    onChange={(e) => dispatch (AddToCart(item.product,
                                    Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map((x) =>(
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                    </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item.product)}>
                                        <Button type='button' class="btn-block">Remove</Button>
                                        </Button>
                                    </Col>
                               </Row>
                           </ListGroup.Item>
                       )
                       )}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card className='subTotal'>
                    <ListGroup variant='flush'>
                     <ListGroup.Item>
                     <h3>
                         SubTotal({cartItems.reduce((acc,item)=>acc + item.qty,0)})Items
                    </h3>
                    Rs.{cartItems
                    .reduce((acc,item)=> acc + item.qty * item.price,0)
                    .toFixed(2)} 
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Button type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0 }
                        onClick={checkOutHandler}>
                             Proceed To Checkout
                         </Button>
                     </ListGroup.Item>
                    </ListGroup>
                </Card>                
        </Col>
        </Row>
    )
}

export default CartScreen
