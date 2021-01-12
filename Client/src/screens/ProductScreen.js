import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Card,Col, ListGroup, Row ,Image, Button, FormControl} from 'react-bootstrap'

import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'


const ProductScreen = ({history,match}) => {
    const [qty,setQty]=useState(1)
    const dispatch =useDispatch()

    const productDetails=useSelector(state=> state.productDetails)
    const {loading,error,product}= productDetails

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
        
    },[dispatch,match])

    const addToCartHandler=()=>{
            history.push(`/cart/${match.params.id} ? qty=${qty}`)
    }
    return (
        <>
    {loading ? <Loader/> : error ? <Message variant='variant'>{error}</Message>: (
        <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name}></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                                />
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card className="order">
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col className="price"><span className="rs">Rs.</span>{product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
    <Col>{product.countInStock > 0 ? 'Available' : 'Not Avaialable'}</Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 &&(
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x) =>(
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                        </option>
                                                ))}
                                            </FormControl>
                                        </Col>
                                        </Row>
                                        </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    )}
            
        </>
    )
}

export default ProductScreen
