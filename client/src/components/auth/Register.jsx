import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';


const Register = (props) => {
    // component state
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // on change handler 
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // on Submit handler 
    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            // fire action
            props.setAlert("Passwords don't match", 'danger', 3000);
        } else {
            // fire action
            props.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
        }
    }

    // Redirect to Dashboard if Logged in
    if (props.isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    
    // Return Component
    return (
      <Fragment>
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <h1 className="title has-text-danger">Sign Up</h1>
            <p className="subtitle">
              <span className="icon">
                <i className="fas fa-user"></i>
              </span>
              <span>Create Your Account</span>
            </p>
            <hr />

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

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
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="confirmPassword"
                    minLength="6"
                    value={formData.confirmPassword}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-outlined is-light is-danger">Register</button>
                </div>
              </div>
            </form>
            <hr />
          </div>
        </div>

        <div className="block has-text-centered">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </Fragment>
    );
}


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setAlert, register })(Register);



