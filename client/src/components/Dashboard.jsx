import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


const Dashboard = ({ auth: { user }}) => {

  return (
    <section className="section">
      <div className="container">
        <div className="hero is-large is-dark">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Welcome {user && user.name}</h1>
              <h2 className="subtitle">This is a Protected Route</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps)(Dashboard);

