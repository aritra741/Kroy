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
import AuthProvider from "./contexts/auth";
import CommonProvider from "./contexts/common";
import ProductsProvider from "./contexts/products";
import CartProvider from "./contexts/cart";
import CheckoutProvider from "./contexts/checkout";
import RouteWrapper from "./layouts/RouteWrapper";
import AuthLayout from "./layouts/AuthLayout";
import CommonLayout from "./layouts/CommonLayout";
import AuthPage from "./pages/auth";
//import HomePage from "../pages/home";
import CheckoutPage from "./pages/checkout";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/products/:id" component={SingleProduct} />
          <Route
            path="/customer/access/:action"
            exact
            component={CustomerAccessPage}
          />
          <RouteWrapper
                    path="/checkout"
                    component={CheckoutPage}
                    layout={CommonLayout}
                  />
           {/* <Route
            path="/customer/checkout"
            exact
            component={CheckOutPage}
          /> */}
        </Switch>
        
      </Router>
        
    </div>
  );
}

export default App;
