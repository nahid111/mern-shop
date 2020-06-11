import React, { Fragment } from "react";

const Product = () => {
  return (
    <Fragment>
      <div className="card product-card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img src="https://picsum.photos/id/1015/480" alt="Placeholder" />
          </figure>
        </div>

        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">Product Title</p>
              <p className="subtitle is-6 has-text-danger">$100</p>
            </div>
          </div>
          <div className="content">Description</div>
        </div>

        <footer className="card-footer">
          <p className="card-footer-item">
            <button className="button is-warning is-outlined is-small is-rounded is-light">
              <span>View Item</span>
              <span className="icon">
                <i className="far fa-eye"></i>
              </span>
            </button>
          </p>
          <p className="card-footer-item">
            <button className="button is-success is-outlined is-small is-rounded is-light">
              <span>Add To Cart</span>
              <span className="icon">
                <i className="fas fa-shopping-basket"></i>
              </span>
            </button>
          </p>
        </footer>
      </div>
    </Fragment>
  );
};

export default Product;
