import{ MY_ORDER_LIST_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../constants/orderConstants'
import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

var os = require("os");
    var hostname = os.hostname();
    console.log("lllllllll",hostname)


export const createOrder = (order)=> async(dispatch,getstate)=>{
    console.log("this is order",order,getstate())
    try {
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
        const {userLogin:{userInfo},
        }= getstate()
        console.log("this is userinfo",userInfo)

        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            },
        }

        const{data} =await axios.post(
            `/api/v1/products/orders`,order,config)
            dispatch({
                type:ORDER_CREATE_SUCCESS,
                payload:data,
                
            })
            console.log("???????",data)
            dispatch({
                type: CART_CLEAR_ITEMS,
                payload: data,
              })
              localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
    
}
export const getOrderDetails = (id)=> async(dispatch,getstate)=>{
    try {
    dispatch({
        type:ORDER_DETAILS_REQUEST
    })
    const {userLogin:{userInfo}}= getstate()
   
    const config={
        headers:{
        Authorization:`Bearer ${userInfo.token}`
            },
        }
    const{data} =await axios.get(`/api/v1/products/orders/${id}`,config)
console.log("qwertyuio",data)

    dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data,
    })

    } catch (error) {
    dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}


export const listMyOrders = ()=> async(dispatch,getstate)=>{
    try {
    dispatch({
        type:MY_ORDER_LIST_REQUEST,
    })
    const {userLogin:{userInfo}}= getstate()
   
    const config={
        headers:{
        Authorization:`Bearer ${userInfo.token}`
            },
        }
    const{data} =await axios.get(`/api/v1/products/orders/getMyOrders`,config)
    console.log("my orders",data)
    dispatch({
            type:MY_ORDER_LIST_SUCCESS,
            payload:data,
            
    })
    } catch (error) {
    dispatch({
            type:MY_ORDER_LIST_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}