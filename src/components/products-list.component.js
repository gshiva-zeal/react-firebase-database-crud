import React, { Component } from "react";
import ProductDataService from "../services/product.service";

import Product from "./product.component";

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);

    this.state = {
      tutorials: [],
      searchProducts: [],
      currentTutorial: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    ProductDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    ProductDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let tutorials = [];
    let searchProducts = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      tutorials.push({
        key: key,
        title: data.title,
        selling_price: data.selling_price,
        description: data.description,
        published: data.published,
      });
    });
    searchProducts = tutorials;

    this.setState({
      tutorials: tutorials,
      searchProducts: searchProducts
    });
  }

  refreshList() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    ProductDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSearchTextChange(e) {
   let filteredProducts = []
    if(e.target.value && e.target.value.length > 0) {
      filteredProducts = this.state.searchProducts.filter(function(product) {
       return product.title.indexOf(e.target.value) > 0;
      })
    }
    else {
      filteredProducts = this.state.tutorials
    }
    this.setState({
      searchProducts: filteredProducts
    })
  }

  render() {
    const { tutorials, currentTutorial, currentIndex, searchProducts } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Product List</h4>
          <input type="text" onChange={this.onSearchTextChange} placeholder="Search Product" />
          <ul className="list-group">
            {searchProducts &&
              searchProducts.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <Product
              tutorial={currentTutorial}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
