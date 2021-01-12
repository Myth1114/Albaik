import React from 'react'
import { Card, Row,Col } from 'react-bootstrap'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'



const RestaurantScreen = () => {

    return (
        <Row className="rest">
            <Col sm={10} md={6} lg={4} xl={3}>
            <Card  className="shadow-lg  mb-0 bg-white rounded">
            <Card.Img className="rounded rounded-bottom" variant="top" src="Images/.jpeg" />
        <Card.Body>
            <Card.Title>Nepal Al-Baik</Card.Title>
            <Card.Text>
                An Arabic chain of crispy chicken frachise now in your area.<br/>
                Halal certified.
            </Card.Text>
            <Link to='/mojito'>
        <Button variant="primary">See Our Items</Button>
        </Link>
        </Card.Body>
        </Card>
    </Col>
    <Col sm={10} md={6} lg={4} xl={3}>
            <Card  className="shadow-lg  mb-0 bg-white rounded">
            <Card.Img className="rounded rounded-bottom" variant="top" src="Images/.jpeg" />
        <Card.Body>
            <Card.Title>Nepal Al-Baik</Card.Title>
            <Card.Text>
                An Arabic chain of crispy chicken frachise now in your area.<br/>
                Halal certified.
            </Card.Text>
            <Link to='/mojito'>
        <Button variant="primary">See Our Items</Button>
        </Link>
        </Card.Body>
        </Card>
    </Col>
    <Col  sm={10} md={6} lg={4} xl={3}>
        <Card  className="shadow-lg  mb-0 bg-white rounded">
  <Card.Img className="rounded rounded-bottom" variant="top" src="Images/kirana.jpeg" />
  <Card.Body>
    <Card.Title> K.C Chicken Corner</Card.Title>
              
    <Card.Text>
        Find best chicken items like momos,sausage,chicken chilly,lolipop etc. 
      
    </Card.Text>
    <Link>
    <Button variant="primary">See Our Items</Button>
    </Link>
  </Card.Body>
</Card>
</Col>


</Row>
    )
}

export default  RestaurantScreen
