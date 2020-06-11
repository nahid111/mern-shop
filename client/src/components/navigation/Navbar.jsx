import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import {viewCart} from '../../store/actions/cart';


const NavigationBar = ({ auth: {user, isAuthenticated}, logout, viewCart }) => {

  const [navMenuIsActive, toggleNavMenu] = useState(false);

  const adminLinks = (
    <Fragment>
      <Link to="/categories" className="navbar-item">
        <span>Categories</span>
      </Link>
      <Link to="/create-products" className="navbar-item">
        <span>Create Products</span>
      </Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link" href="#!">
          <figure className="image is-32x32">
            <img
              className="is-rounded"
              src={
                user && user.avatar
                  ? `http://localhost:5000/uploads/${user.avatar}`
                  : "https://avatars.dicebear.com/api/bottts/5.svg"
              }
              alt="avatar"
            />
          </figure>
          <span>{user ? user.name : "username"}</span>
        </a>

        <div className="navbar-dropdown">
          <Link className="navbar-item" to="/dashboard">
            <span className="icon is-small">
              <i className="fas fa-chart-line"></i>
            </span>
            <span>Dashboard</span>
          </Link>
          <Link to="/profile" className="navbar-item">
            <span className="icon is-small">
              <i className="fas fa-cog"></i>
            </span>
            <span>Profile</span>
          </Link>
          {user && user.role === "admin" && adminLinks}
          <a href="#!" className="navbar-item" onClick={logout}>
            <span className="icon is-small">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/register" className="navbar-item has-text-danger">
        <span className="icon">
          <i className="fas fa-user-plus"></i>
        </span>
        <span>Register</span>
      </Link>
      <Link to="/login" className="navbar-item">
        <span className="icon">
          <i className="fas fa-sign-in-alt"></i>
        </span>
        <span>Login</span>
      </Link>
    </Fragment>
  );


  return (
    <nav
      className="navbar has-background-link-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <i className="fab fa-pied-piper"></i>
        </Link>

        <a
          role="button"
          className={`navbar-burger burger ${navMenuIsActive && "is-active"}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          href="#!"
          onClick={() => {
            toggleNavMenu(!navMenuIsActive);
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarMenu"
        className={`navbar-menu ${navMenuIsActive && "is-active"}`}
      >
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/products">
            Products
          </Link>
        </div>

        <div className="navbar-end">
          <a href="#!" className="navbar-item" onClick={viewCart}>
            <span className="icon">
              <i className="fas fa-shopping-cart"></i>
            </span>
            <span className="tag has-text-danger-dark">10</span>
          </a>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};


NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps, { logout, viewCart })(NavigationBar);
