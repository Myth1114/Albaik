
import React from 'react'
import { Table } from 'react-bootstrap'
// import { Card } from 'react-bootstrap'
// import Rating from './Rating'

import {Link} from 'react-router-dom'
const Product = ({product}) => {
    return (
        <div>
            <Table className="table table-light">
    <thead>
  </thead>
  <tbody >
    <tr className=" d-flex justify-content-between">
      <td><img src={product.image} alt=""/></td>
      <td><Link to={`/product/${product._id}`}>{product.name}</Link></td>
      <td>{product.price}</td>
      <td><i className="fas fa-info-circle"></i></td>
    </tr>
  </tbody>
</Table>            
    </div>
        // <Card className="shadow-lg  mb-0 bg-white rounded ">
        //     <Link to={`/product/${product._id}`}>
        //         <Card.Img className="rounded rounded-bottom" src={product.image} variant='bottom'/>
        //     </Link>

        //     <Card.Body>
        //         <Link to={`/product/${product._id}`}>
        //         <Card.Title>
        //             <strong>{product.name}</strong>
                    
        //         </Card.Title>
        //         </Link>
        //         <Card.Text as='h4'>
        //         <span className='rs'>Rs.</span>{product.price}
        //     </Card.Text>
        //     <Card.Text as='div'>
        //          <Rating 
        //             value={product.rating} 
        //             text={`${product.numReviews} reviews`}
        //             color='green'
        //         />    
        //     </Card.Text>
        //     </Card.Body>
        // </Card>
    )
}

export default Product
