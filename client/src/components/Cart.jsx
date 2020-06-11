import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { hideCart } from "../store/actions/cart";


const Cart = ({ cart, hideCart }) => {
  
  cart.viewCart
    ? document.body.classList.add("is-clipped")
    : document.body.classList.remove("is-clipped");

  const cartModal = (
    <Fragment>
      <div id="modal" className={`modal ${cart.viewCart && "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head has-background-link">
            <p className="modal-card-title has-text-light">Cart</p>
            <button className="delete" onClick={hideCart} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="table-containerr">
              <table className="table is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>img</th>
                    <th>name</th>
                    <th>price</th>
                    <th>qty</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <figure className="image is-32x32">
                        <img src="https://picsum.photos/id/1015/32" alt='img' />
                      </figure>
                    </td>
                    <td>Portable HDD</td>
                    <td>$100</td>
                    <td>
                      <span className="icon has-text-success">
                        <i className="fas fa-angle-up"></i>
                      </span>
                      <span>10</span>
                      <span className="icon has-text-danger">
                        <i className="fas fa-angle-down"></i>
                      </span>
                    </td>
                    <td>
                      <button className="delete" aria-label="delete"></button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <figure className="image is-32x32">
                        <img src="https://picsum.photos/id/1016/32" alt='img' />
                      </figure>
                    </td>
                    <td>Portable HDD</td>
                    <td>$100</td>
                    <td>
                      <span className="icon has-text-success">
                        <i className="fas fa-angle-up"></i>
                      </span>
                      <span>5</span>
                      <span className="icon has-text-danger">
                        <i className="fas fa-angle-down"></i>
                      </span>
                    </td>
                    <td>
                      <button className="delete" aria-label="delete"></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <footer
            className="modal-card-foot"
            style={{justifyContent: "space-between"}}
          >
            <div>
              <b>Total: $200</b>
            </div>
            <div>
              <button className="button is-rounded is-outlined is-danger is-light">
                <span className="icon">
                  <i className="fas fa-trash"></i>
                </span>
                <span>Clear Cart</span>
              </button>
              <button className="button is-rounded is-outlined is-success is-light">
                <span className="icon">
                  <i className="fas fa-credit-card"></i>
                </span>
                <span>Checkout</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </Fragment>
  );

  return <Fragment>{cart.viewCart && cartModal}</Fragment>;
};


Cart.propTypes = {
  cart: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  cart: state.cart,
});


export default connect(mapStateToProps, { hideCart })(Cart);
