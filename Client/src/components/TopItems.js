import React from 'react'
import './TopItems.css';
import Restaurant from './Images/restaurant.png';
import Grocery from './Images/grocery.png';
import Cosmetics from './Images/cosmetics.png';
import Fruits from './Images/fruits.png';
import Vegetables from './Images/vegetables.png';
import Medicine from './Images/medicine.png';
import Dairy from './Images/dairy.png';
import Vestige from './Images/vestige.png';

import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

const TopItems = () => {
   return (
      <div className="topproducts">
             
         <Link to="restaurant">
            <IconButton>
            <div className="restraunt">
            <span> <img className="categoriesImage" src={Restaurant} alt='albaik'/></span>
            <span className="text">Restraunt</span>
            </div>
            </IconButton>
         </Link>         

         <IconButton>
         <div className="cosmetics">
            <span><img className="categoriesImage" src={Cosmetics} alt='albaik'/></span> 
            <span className="text">Cosmetics</span>
            </div>
         </IconButton>
      

         <IconButton>
         <div className="fruits">
           <span> <img className="categoriesImage" src={Fruits} alt='albaik'/></span>
            <span className="text">Fruits</span>
            </div>
         </IconButton>

         <IconButton>
         <div className="medicine">
            <span><img className="categoriesImage" src={Medicine} alt='albaik'/></span>
            <span className="text">Medicines</span>
            </div>
         </IconButton>

         <IconButton>
         <div className="grocery">
            <span><img className="categoriesImage" src={Grocery} alt='albaik'/></span>
            <span className="text">Grocery</span>
            </div>
         </IconButton>

         <IconButton>
         <div className="vestige">
            <span><img className="categoriesImage" src={Vestige} alt='albaik'/></span>
            <span className="text">Vestige</span>
            </div>
         </IconButton>

         <IconButton>
         <div className="vegetables">
            <span><img className="categoriesImage" src={Vegetables} alt='albaik'/></span>
            <span className="text">Vegetables</span>
            </div>
         </IconButton>

         <IconButton>
         <div className="dairy">
           <span> <img className="categoriesImage" src={Dairy} alt='albaik'/></span>
            <span className="text">Dairy</span>
            </div>
         </IconButton>
      

         {/* <IconButton>
            <img src={albaik} alt='albaik'/>
         </IconButton>

         <IconButton>
            <img src={albaik} alt='albaik'/>
         </IconButton> */}


        
            
           </div> 
   )
}

export default TopItems
