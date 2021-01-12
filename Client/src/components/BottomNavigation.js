import React from 'react';
import './BottomNavigation.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';



function footer() {
    return (
        <div className='footer'>
           
         <IconButton>
             <Link to='/'>
             <HomeIcon className='store-icon'/>
             
             </Link>
         </IconButton>
      
         <IconButton>
            <Link to='/cart'>
             <ShoppingCartIcon className='shopping-cart-icon'/>
             </Link>
         </IconButton>

         <IconButton>
            <Link to='/profile'>
             <PersonIcon className='person-icon'/>
             </Link>
         </IconButton>

         <IconButton>
            <Link to='/help'>
             <ContactPhoneIcon/>
             </Link>
         </IconButton>

     </div>
    );
}

export default footer;



// import React from 'react'
// import {Link} from 'react-router-dom';
// import './BottomNavigation.css'
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import MessageIcon from '@material-ui/icons/Message';
// import LocalMallIcon from '@material-ui/icons/LocalMall';
// import IconButton from '@material-ui/core/IconButton';
// import HomeRounded from '@material-ui/icons/HomeRounded';
// // import  {useSelector} from 'react-redux'

// export const BottomNavigation = () =>{
//     // const cart = useSelector((state)=>state.cart)
//     // const {cartItems}=cart
//     const bottom = [
//         {
//             name:'/',
//             title:'Home',
//             path:'/',
//             icon:<HomeRounded/>,
//         },
//         {
//             title:'cart',
//             name:'/cart',
//             icon:<ShoppingCartIcon/>,
//         },{
//             title:'My Orders',
//             name:'/profile',
//             icon:<LocalMallIcon/>,
//         },{
//             title:'Message',
//             name:'Message',
//             icon:<MessageIcon />,
//         }
//     ]
//     return(
//         <div >
//             <div className="BottomNav">
//                     {bottom.map((iteam,idx)=>{
//                         return(
//                             <div className="Content" key={idx}>
//                                 <Link to={iteam.name}>
//                                         <IconButton>
//                                             {iteam.icon}
//                                         </IconButton>
//                                         <span className="BottomName">{iteam.title}</span>
//                                 </Link>
//                             </div>
//                         )
//                     })}
//             </div>
//         </div>
//     )
// }
// export default BottomNavigation