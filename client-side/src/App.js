import React from "react";
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Footer from './components/Footer';
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import { BrowserRouter as Router, Route} from "react-router-dom";
import ItemScreen from "./screens/ItemScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterUserScreen from "./screens/RegisterUserScreen";
import RegisterRestaurantScreen from "./screens/RegisterRestaurantScreen";
import LoginRestaurantScreen from "./screens/LoginRestaurantScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import RestaurantProfileScreen from './screens/RestaurantProfileScreen';
import RestaurantItemsScreen from './screens/RestaurantItemsScreen';
import AddNewItemScreen from "./screens/AddNewItemScreen";
import UpdateItemScreen from "./screens/UpdateItemScreen";

function App() {
  return (
      <Router>
          <Header />
          <main className='py-3'>
              <Container>
                  <Route path='/' component={HomeScreen} exact />
                  <Route path='/restaurants/:id' component={MenuScreen} exact />
                  <Route path='/restaurant/home' component={LoginRestaurantScreen} exact />
                  <Route path='/restaurant/register' component={RegisterRestaurantScreen} exact />
                  <Route path='/restaurant/profile' component={RestaurantProfileScreen} exact />
                  <Route path='/restaurant/viewitems' component={RestaurantItemsScreen} exact/>
                  <Route path='/restaurant/addnewitem' component={AddNewItemScreen} exact/>
                  <Route path='/itemupdate/:id' component={UpdateItemScreen} exact/>
                  <Route path='/item/:id' component={ItemScreen} exact />
                  <Route path="/cart/:id?" component={CartScreen} exact/>
                  <Route path="/login" component={LoginScreen} exact/>
                  <Route path="/register" component={RegisterUserScreen} exact/>
                  <Route path="/profile" component={UserProfileScreen} exact />
                  <Route path="/delivery" component={DeliveryScreen} exact />
                  <Route path="/payment" component={PaymentScreen} exact />
                  <Route path="/placeorder" component={PlaceOrderScreen} exact />
                  <Route path="/order/:id" component={OrderDetailsScreen} exact />
              </Container>
          </main>
          <Footer/>
      </Router>
  );
}

export default App;
