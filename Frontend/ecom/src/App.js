import "./App.css";
import { HomePage } from "./containers/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CustomerAccessPage } from "./containers/customerAccessPage";
import Products from "./components/Products/Products";
import Test from "./components/Products/Test";
import SingleProduct from "./components/Products/Product/SingleProduct";
//import  CheckOutPage  from "./containers/CheckOutPage/CheckOutPage";
//import CartProvider from "./contexts/cart";
//import CheckoutProvider from "./contexts/checkout";
//import CheckoutPage from "../src/pages/checkout";
import React from "react";
//import { BrowserRouter as Router, Switch } from "react-router-dom";
import CommonProvider from "./contexts/common";
import ProductsProvider from "./contexts/products";
import CartProvider from "./contexts/cart";
import CheckoutProvider from "./contexts/checkout";
import AuthLayout from "./layouts/AuthLayout";
import CommonLayout from "./layouts/CommonLayout";
import AuthPage from "./pages/auth";
import MTable from "./components/Products/Product/MTable";
//import HomePage from "../pages/home";
import CheckoutPage from "./pages/checkout";
import Upload from "./components/Upload";
import "./assets/scss/style.scss";
import { MyProducts } from "./components/UserProfile/MyProducts";
import AfterPayment from "./components/AfterPayment/AfterPayment";
import {Electronics} from './components/Collections/Electronics'
import { Furnitures } from "./components/Collections/Furnitures";
import { Other } from "./components/Collections/Other";
import Chat from "./components/Chat/Chat";
import Search from "./components/Search/Search";
import SingleService from "./components/Products/Product/SingleService";

const App = () => {
  return (
    <div className="App">
        <ProductsProvider>
          <CartProvider>
            <CheckoutProvider>
              <Router>
                <Switch>
                  <Route
                    path="/"
                    exact
                    component={HomePage}
                   // layout={CommonLayout}
                  />
                  <Route
                    path="/checkout"
                    component={CheckoutPage}
                    layout={CommonLayout}
                  />
                  <Route
                    path="/electronics"
                    component={Electronics}
                  />
                  <Route
                    path="/search/"
                    component={Search}
                  />
                  
                  <Route
                    path="/chats"
                    component={Chat}
                  />
                  <Route
                    path="/furnitures"
                    component={Furnitures}
                  />
                  <Route
                    path="/other"
                    component={Other}
                  />
                  
                  
                  <Route
                    path="/auth"
                    component={AuthPage}
                    layout={AuthLayout}
                  />
                  <Route
                    path="/upload"
                    component={Upload}
                  />
                  <Route
                    path="/done"
                    component={AfterPayment}
                  />
                  <Route
                    path="/table"
                    component={MTable}
                  />
                  
                  <Route
                    path="/myproducts"
                    component={MyProducts}
                  />
                  <Route path="/payment"
                  render={() => 
                  window.location = "http://127.0.0.1:3030/ssl-request"} />
                  <Route path="/paymentdone"
                  render={() => 
                  window.location = "http://127.0.0.1:3000/"} />
                  
                  <Route path="/products/:id" component={SingleProduct} />
                  <Route path="/services/:id" component={SingleService} />
                  <Route
                    path="/customer/access/:action"
                    exact
                    component={CustomerAccessPage}
                  />
                   <Route

                   
                    path="/upload"
                    component={Upload}
                  />
                </Switch>
              </Router>
            </CheckoutProvider>
          </CartProvider>
        </ProductsProvider>
    </div>
  );
};

export default App;
