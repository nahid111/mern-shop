import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import PropTypes from "prop-types";


const NavigationBar = ({ auth: {user, isAuthenticated, loading}, logout }) => {

  const [navMenuIsActive, toggleNavMenu] = useState(false);

  const authLinks = (
    <div className="navbar-end">
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link" href="#!">
          <figure className="image is-32x32">
            <img
              className="is-rounded"
              src={
                user && user.avatar
                  ? `http://localhost:5000/uploads/${user.avatar}`
                  : "https://via.placeholder.com/32x32"
              }
              alt="avatar"
            />
          </figure>
          <span>{user ? user.name : "username"}</span>
        </a>

        <div className="navbar-dropdown">
          <Link to="/profile" className="navbar-item">
            <span className="icon is-small">
              <i className="fas fa-cog"></i>
            </span>
            <span>Profile</span>
          </Link>
          <a href="#!" className="navbar-item" onClick={logout}>
            <span className="icon is-small">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );

  const guestLinks = (
    <div className="navbar-end">
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
    </div>
  );


  return (
    <nav
      className="navbar is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <i className="fab fa-react"></i>
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
          <Link className="navbar-item" to="/dashboard">
            Dashboard
          </Link>
        </div>

        {isAuthenticated ? authLinks : guestLinks}
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


export default connect(mapStateToProps, { logout })(NavigationBar);
