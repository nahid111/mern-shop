import React, { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../store/actions/alert";
import { resetPassword } from "../../store/actions/auth";


const ResetPassword = ({ setAlert, resetPassword }) => {
  let { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords don't match", "danger", 3000);
      return;
    }
    resetPassword(token, password);
  };


  return (
    <Fragment>
      <div className="columns">
        <div className="column is-6 is-offset-3">
          <h1 className="title has-text-primary">Reset Password</h1>
          <p className="subtitle">
            <span className="icon">
              <i className="fas fa-key"></i>
            </span>
            <span>Submit your new password</span>
          </p>
          <hr />

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="field">
              <label className="label">New Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-primary is-outlined is-light">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <hr />
        </div>
      </div>

      <p className="has-text-centered">
        Don't have an account?{" "}
        <Link to="/register" className="has-text-danger">
          Sign Up
        </Link>
      </p>
      <p className="has-text-centered">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </Fragment>
  );
};


ResetPassword.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, { setAlert, resetPassword })(ResetPassword);

