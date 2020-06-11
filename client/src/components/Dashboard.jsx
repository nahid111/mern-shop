import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";


const Dashboard = ({ auth: { user }}) => {

  return (
    <div className="hero is-light is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Welcome {user && user.name}</h1>
          <h2 className="subtitle">This is a Protected Route</h2>
          {user
            ? user.role === "admin" && (
                <Link to="/categories" className="has-text-danger">
                  Categories
                </Link>
              )
            : ""}
        </div>
      </div>
    </div>
  );
};


Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps)(Dashboard);

