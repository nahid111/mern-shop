import React, { Fragment } from "react";
import Product from './Product.jsx';

const Products = () => {
  return (
    <Fragment>
      <div className="columns is-multiline">
        {/* Product Card */}
        <div className="column is-3">
          <Product/>
        </div>
        <div className="column is-3">
          <Product/>
        </div>
        <div className="column is-3">
          <Product/>
        </div>
        <div className="column is-3">
          <Product/>
        </div>
        <div className="column is-3">
          <Product/>
        </div>
        <div className="column is-3">
          <Product/>
        </div>
        {/* Product Card End */}
      </div>
    </Fragment>
  );
};

export default Products;
