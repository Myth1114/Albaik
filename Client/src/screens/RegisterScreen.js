import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import { Avatar } from '@material-ui/core'



const RegisterScreen = ({location,history}) => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[message,setMessage]=useState(null)

    const dispatch = useDispatch()

    const userRegister =useSelector (state=> state.userRegister)
    const {loading ,error,userInfo} =userRegister //userInfo,loadign,error is coming fron userReducers.js
     
    const redirect =location.search ? location.search.split('=')[1]: '/'

    useEffect(() => {
        if(userInfo){
           history.push(redirect) 
        }
    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password,confirmPassword))
        }
    }

    return(
        <div className='form'>
            <div className="avatar">
                <Avatar alt="User" src="/Images/" />
            </div>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label> Name</Form.Label>
                        <Form.Control 
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}>
                </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
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
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Conform password'
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                <Row>
                <Col>
                <Checkbox
                    defaultChecked
                    size="small"
                    inputProps={{ 'aria-label': 'checkbox with small size' }}
                />
                I agree to the Terms and Conditions
                </Col>
            </Row>
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
                <Row className='py-3'>
                    <Col>
                        Have an Account? {' '}
                        <Link to={redirect ? `/signIn?redirect=${redirect}` : '/signIn'}><span className='text'>Login</span></Link>
                    </Col>
                </Row>
         <FormContainer/>
         </div>
         
    )
}

export default RegisterScreen
