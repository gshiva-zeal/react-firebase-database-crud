import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import AddProduct from "./components/add-product.component";
import ProductsList from "./components/products-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            SPM Groceries
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add/category"} className="nav-link">
                Add Category
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add/product"} className="nav-link">
                Add Product
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>SPM Groceries BackOffice Management</h2>
          <Switch>
            <Route exact path={["/", "/categories"]} component={TutorialsList} />
            <Route exact path="/products" component={ProductsList} />
            <Route exact path="/add/category" component={AddTutorial} />
            <Route exact path="/add/product" component={AddProduct} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
