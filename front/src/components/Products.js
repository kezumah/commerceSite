import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

function Products() {

  const [query, setQuery] = useState("");
  const [products, setState] = useState([]);

  const onChangeQuery = (evt) => {
    console.log("query: ", evt.target.value);
    
    setQuery(evt.target.value);
  }
/*
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`/api/products`);
        const json = await response.json();
        console.log(json);
        setState(json.data)
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    fetchData();
  }, []);

*/

  useEffect(() => {
    const fetchData = async() => {
      try {
        console.log("UPDATING PRODUCTS");
        console.log("QUERY: ", {query});
        if(query === "") {
          console.log("NO QUERY")
          const response = await fetch(`/api/products`);
          const json = await response.json();
          console.log(json);
          setState(json.data)
        } else {
          console.log("QUERY FOUND!")
          const response = await fetch(`/api/products/${query}`);
          const json = await response.json();
          console.log(json);
          setState(json.data)
        }
      } catch(e) {
        console.log("Error: ", e);
      }
    };

    fetchData();
  }, [query])

  return (
    <div>
      <h1 className = "title">Our Products</h1>
      <div className = "search-products row">
        <div className = "col-12">
          <label htmlFor="search">Search Products by Name: </label>
          <input 
            type = "text" 
            className = "form-control" 
            id = "search" 
            placeholder = "search..." 
            onChange={onChangeQuery} value = {query}
          />
        </div>
      </div>
      <div className = "row">
        {products.map(function(product, index) {
          return <div key = {index} className = "products col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <div className="card">
              <img className="card-img-top" src={product.src} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
              </div>
              <p className="card-text">{product.price}</p>
              <Link to = {`/product/${product._id}`} className="nav-link btn btn-primary text-light" aria-current="page">View Product</Link>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Products;