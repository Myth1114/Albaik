import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Navbar,Nav,Container,NavDropdown} from 'react-bootstrap' 
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import './Header.css'
const Header=()=>{
    
    const dispatch = useDispatch()
    const userLogin =useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    const logoutHandler = () => {
        dispatch(logout())
      }
    return (
        <header>
            <Navbar  bg='primary' variant='dark' expand="lg" collapseOnSelect>
            <Container>
               
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <span className="zinni">Zinni</span>
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle  aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbarTogglerDemo01">
                <Nav className="ml-auto">
            <LinkContainer to='/example'>
                <Nav.Link>
                    <i className='fas fa-home fa-lg'></i>Home
                </Nav.Link>
            </LinkContainer>
             {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
             ):(
                  <LinkContainer to='/signIn'>
             <Nav.Link>
                 <i className='fas fa-user fa-lg'></i>Sign In
             </Nav.Link>
        </LinkContainer>)}         
           
            </Nav>
                </Navbar.Collapse>
        </Container>
            </Navbar>
        </header> 
    )
}

export default Header
