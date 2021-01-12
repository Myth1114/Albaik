import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {  Form, } from 'react-bootstrap'

import axios from 'axios'
import GoogleLogin from 'react-google-login'

const LoginScreen = ({location,history}) => {

    const responseSuccessGoogle = (response) => {
        console.log(response,"this is response");
        console.log(response.tokenId,"working")
        axios({
          method: "POST",
          url: `/api/v1/users/googleLogin`,
          data: {
            tokenId: response.tokenId,
          }
        }).then((response) => {
          console.log("google login success",response);
         
          document.location.href = '/payment'
          window.location.reload()
          localStorage.setItem('userInfo',JSON.stringify(response.data))
        }).catch(err=>{
            console.log(err)
        });
      };
    const responseErrorGoogle = (response) => {};
    const[email]=useState('')
    const[password]=useState('')

    const dispatch = useDispatch()

    const userLogin =useSelector (state=> state.userLogin)
    const {loading ,error,userInfo} =userLogin //userInfo,loadign,error is coming fron userReducers.js
     
    const redirect =location.search ? location.search.split('=')[1]: '/'
    console.log(redirect,history)
    useEffect(() => {
        if(userInfo){
           history.push(redirect) 
        }
    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))

    }

    return(
        
        <div className='form'  >
            {/* <div className="avatar">
                <Avatar alt="User" src="/Images/" />
            </div> */}
            {error && <Message variant='danger'>Invalid Email or Password </Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                {/* <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}>
                        </Form.Control>
                </Form.Group> */}
                {/* <Button type='submit' variant='primary'>Sign In</Button> */}
                <div className="col-md-6 offset-md-3 text-center">
            <GoogleLogin
                clientId="973749724858-jfq1ig87hkd296g50kkk3g4845l66hn3.apps.googleusercontent.com"
                // buttonText="Login"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={"single_host_origin"}
                         />
            </div>
            </Form>
                {/* <Row className='py-3'>
                    <Col>
                        New User? {' '}
                        <Link to={redirect ? `/signUp?redirect=${redirect}` : '/signUp'}><span className='text'>Register</span></Link>
                    </Col>
                </Row> */}
         <FormContainer/>
         </div>
         
    )
}

export default LoginScreen
