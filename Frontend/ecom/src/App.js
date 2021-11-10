import "./App.css";
import { HomePage } from "./containers/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CustomerAccessPage } from "./containers/customerAccessPage";
import Products from "./components/Products/Products";

function App() {
  return (
    <div className="App">
      <Products />
      {/* <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/customer/access/:action"
            exact
            component={CustomerAccessPage}
          />
        </Switch>
      </Router> */}
      Kroy
    </div>
  );
}

export default App;
