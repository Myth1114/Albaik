import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
//import CategoryScreen from './screens/CategoryScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import BottomNavigation from './components/BottomNavigation'
import FrontScreen from './screens/FrontScreen'
import RestaurantScreen from './screens/RestaurantScreen'
import Example from './screens/Example'
//CategoryScreen
// let route=window.location.pathname?window.location.pathname:undefined
function App() {
  
  return (
    <Router>
      <Header />
      {/* <SubHeader /> */}
      <main className='py-0'>
        <Container>
        <Route path='/' component={FrontScreen} exact></Route>
        <Route path='/allItems' component={HomeScreen} exact></Route>
        <Route path='/gap' component={FrontScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen} exact></Route>
          <Route path='/cart/:id?' component={CartScreen} ></Route>
          <Route path="/mojito" component={HomeScreen} exact />
          <Route path='/crushers' component={HomeScreen} exact></Route>
          <Route path='/drinks' component={HomeScreen} exact></Route>
          <Route path='/burger' component={HomeScreen}></Route>
          <Route path='/twister' component={HomeScreen} exact></Route>
          <Route path='/fries' component={HomeScreen} exact></Route>
          <Route path='/momo' component={HomeScreen} exact></Route>
          <Route path='/cutlet' component={HomeScreen} exact></Route>
          <Route path='/friedChicken' component={HomeScreen} exact></Route>
          <Route path='/boxMeal' component={HomeScreen} exact></Route>
          <Route path='/bucket' component={HomeScreen} exact></Route>
          <Route path='/NepalAlbaik' component={HomeScreen} exact></Route>
          <Route path='/signIn' component={LoginScreen}></Route>
          <Route path='/signUp' component={RegisterScreen}></Route>
          <Route path='/profile' component={ProfileScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/payment' component={PaymentScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/products/orders/:id' component={OrderScreen}></Route>
          <Route path='/restaurant' component={RestaurantScreen}></Route>
          <Route path='/example' component={Example}></Route>
        </Container>
      </main>
      <BottomNavigation/>
    </Router>
  )
}

export default App
