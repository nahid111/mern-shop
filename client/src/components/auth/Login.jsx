import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../store/actions/auth';


const Login = ({isAuthenticated, login}) => {

    // component state
    const [formData, setFormData] = useState({ email: '', password: '' });

    // on change handler 
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        login(formData.email, formData.password);
    }


    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }


    return (
      <Fragment>
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <h1 className="title has-text-link">Sign In</h1>
            <p className="subtitle">
              <span className="icon">
                <i className="fas fa-user"></i>
              </span>
              <span>Sign Into Your Account</span>
            </p>
            <hr />

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    minLength="6"
                    value={formData.password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-link is-outlined is-light">Login</button>
                </div>
              </div>
            </form>
            <hr />
          </div>
        </div>

        <p className="has-text-centered">
          <Link to="/forgot-password" className="has-text-success">
            forgot password!
          </Link>
        </p>
        <p className="has-text-centered">
          Don't have an account?{" "}
          <Link to="/register" className="has-text-danger">
            Sign Up
          </Link>
        </p>
      </Fragment>
    );
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);


