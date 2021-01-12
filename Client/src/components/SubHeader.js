import React from 'react'
import {Link} from 'react-router-dom';
import './SubHeader.css'
import IconButton from '@material-ui/core/IconButton';


export const SubHeader = () =>{
    return(
        <div className="subheader">
            <IconButton>
                <Link to="/allItems">
                <span className="sub-category">All Items </span>
                </Link>
             
            </IconButton>
            <IconButton>
                <Link to="/mojito">
                <span className="sub-category">Mojito </span>
                </Link>
             
            </IconButton>

            <IconButton>
                <Link to="/crushers">
                <span className="sub-category">Crushers </span>
                </Link>
            </IconButton>

            <IconButton>
                <Link to='/burger'>
                <span className="sub-category">Burger</span>
                </Link>
            </IconButton>

            <IconButton>
                <Link to='/twister'>
                <span className="sub-category">Twister</span>
                </Link>
            </IconButton>

            <IconButton>
                <Link to='/drinks'>
                <span className="sub-category">Drinks</span>
                </Link>
            </IconButton>

            <IconButton>
                <Link to='friedChicken'>
                <span className="sub-category">Fried Chicken </span>
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/boxMeal'>
                <span className="sub-category">Box Meal </span>
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/bucket'>
                <span className="sub-category">Buckets </span>
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/momo'>
                <span className="sub-category">Momo </span>
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/fries'>
                <span className="sub-category">Fries </span>
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/cutlet'>
                <span className="sub-category">Cutlet </span>
                </Link>
            </IconButton>
        
        </div>
    )
}
export default SubHeader