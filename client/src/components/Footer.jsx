import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer className="hero has-background-link-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="columns">
              <div className="column has-text-centered">
                <a
                  className="has-text-dark"
                  href="https://www.github.com/nahid111"
                  target="_blank" rel="noopener noreferrer"
                >
                  <span className="icon">
                    <i className="fab fa-github fa-2x"></i>
                  </span>
                </a>
                <div>github.com/nahid111</div>
              </div>
              <div className="column has-text-centered">
                <h4 className="is-size-3">AROUND THE WEB</h4>
                <div className="columns mt-1">
                  <div className="column is-offset-2">
                    <a
                      className="has-text-dark"
                      href="https://www.facebook.com/muhammad.nahid.90"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <span className="icon">
                        <i className="fab fa-facebook fa-2x"></i>
                      </span>
                    </a>
                  </div>
                  <div className="column">
                    <a
                      className="has-text-dark"
                      href="https://www.linkedin.com/in/muhammad-nahid-371a5180/"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <span className="icon">
                        <i className="fab fa-linkedin fa-2x"></i>
                      </span>
                    </a>
                  </div>
                  <div className="column">
                    <a
                      className="has-text-dark"
                      href="https://twitter.com/mdnahid22"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <span className="icon">
                        <i className="fab fa-twitter fa-2x"></i>
                      </span>
                    </a>
                  </div>
                  <div className="column is-2"></div>
                </div>
              </div>
              <div className="column has-text-centered">
                <p>
                  <span className="icon">
                    <i className="fas fa-envelope fa-2x"></i>
                  </span>
                </p>
                <p>mdnahid22@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <section className="hero is-small has-background-grey-dark">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h2 className="has-text-light">copyright &copy; yourdomain.com</h2>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Footer;
