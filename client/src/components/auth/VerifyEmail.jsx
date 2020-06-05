import React, {Fragment} from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { verifyEmail } from "../../store/actions/auth";

const VerifyEmail = ({isVerified, verifyEmail}) => {
    let { token } = useParams();
    verifyEmail(token);

    return (
      <Fragment>
        {isVerified && (
          <section className="section">
            <div className="container">
              <div className="hero is-large">
                <div className="hero-body">
                  <div className="container has-text-centered">
                    <h1 className="title is-size-1 has-text-success">Email Verified</h1>
                    <h2 className="is-size-3">
                      <Link to="/login">Login</Link> to continue
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Fragment>
    );
};


VerifyEmail.propTypes = {
    verifyEmail: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    isVerified: state.auth.isVerified
});


export default connect(mapStateToProps, {verifyEmail})(VerifyEmail)
