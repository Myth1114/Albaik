import React from "react";
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
import './TrendingItems.css'
import { Divider } from "@material-ui/core";
import ScrollAnimation from 'react-animate-on-scroll';

function Counter() {
  return (
   
    <div className="container pl-0">
  <h4 className="trending">Trending Items</h4>
  <div className="row">
    <div className="col-md-6">
    <ScrollAnimation animateIn="fadeIn">
      <img src="/Images/chickenLollypop.jpeg" alt="" className="w-100 rounded-circle shadow-lg  mb-0 bg-white rounded "/>
      </ScrollAnimation>
    </div>
   
    <div className="col-md-6" >

      <div className="row align-items-center h-100">
        <div className="col">
          <h3 className="display-6">Chicken Lollypop</h3>
          <p className="lead small">Flexbox grids help you build some really nice layouts.
            <br /><br />
            <Link to="">
            <Button type='button' className="btn-block">More</Button>        
            </Link>            
          </p>

        </div>
      </div>

    </div>
 

  </div>
  
  <div className="row">
    <div className="col-md-6 order-md-6  " >
    <ScrollAnimation animateIn="fadeIn">
      <img src="/Images/crispyChicken.jpeg" alt="" className="w-100  rounded-circle shadow-lg mb-10 bg-white rounded"/>
      </ScrollAnimation>
    </div>
    <div className="col-md-6 order-md-1">
      <div className="row align-items-center h-100">
        <div className="col">
          <h3 className="display-6">Crispy Chicken</h3>
          <p className="lead small">Push and pull classNamees were added to change the order on desktop but still have the image before the text on mobile.
            <br /><br />
            <Link to="">
            <Button type='button' className="btn-block">More</Button>        
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  <Divider/>
</div>
  )
}

export default Counter;