import React, {useEffect } from 'react'
import {Table,Button, Row, Col } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listMyOrders} from '../actions/orderActions'
 
const ProfileScreen = ({history }) => {
  
const dispatch = useDispatch()  
const myOrderList = useSelector((state) => state.myOrderList)
const { loading:loadingOrders, error:errorOrders, order } = myOrderList //myOrderList from store.js
  
useEffect(()=>{
  dispatch(listMyOrders())
},[dispatch,history])
  
  return (
    <Row  className="order">
      <Col md={9} >
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped  responsive className='table-sm' >
            <thead>
              {/* <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr> */}
            </thead>
            <tbody>
              {order.map((order) => (
                <tr key={order._id}>
                  <td></td>
                  <td>{order.image}</td>
                  <td>{order._id}</td>
                  <td>Rs.{order.totalPrice}</td>
                  {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                  <td>
                    {order.isPaid ? (
                      <i class="fas fa-check" style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <i class="fas fa-check" style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/products/orders/${order._id}`}>
                      <Button className='btn-sm' variant='dark'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}
export default ProfileScreen