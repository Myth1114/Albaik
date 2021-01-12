import React from 'react'
import ProductCarousel from '../components/ProductCarousel'
import TopItems from '../components/TopItems'
import TrendingItems from '../components/TrendingItems'
import ScrollAnimation from 'react-animate-on-scroll';
import Search from '../components/Search';


const FrontScreen = () => {

     return (
       
         <div className="front">
           <Search/>
           <ScrollAnimation animateIn="fadeIn">
           <TopItems/>
         </ScrollAnimation>
           
         <ProductCarousel/>
         <TrendingItems/>
         
          </div>
   )
 }
export default FrontScreen
