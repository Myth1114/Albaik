import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'


const HomeScreen = () => {
   const dispatch =useDispatch()
   const productList=useSelector(state => state.productList)
   const {loading,error,products} =productList

useEffect(()=>{
    dispatch(listProducts())
},[dispatch])

let items=window.location.pathname.substring(1)?`Your Result for ${window.location.pathname.substring(1)}`:'all items';

    return (
        <>
        
    <h3 className='center'>{items}</h3> 
            {loading ? (
                <Loader/>
            ): error ?(
            <Message variant='danger'>{error}:</Message>
            ):(
                 <Row className='subTotal'>
                {products.map (product =>(
                   <Col className="product" key={product._id} sm={10} md={6} lg={4} xl={3}>
                       <Product product={product}/>
                   </Col>
                ))}  
               
        </Row>)}
         </>
  )
}

export default HomeScreen
