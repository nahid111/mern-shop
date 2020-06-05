import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { loadUser, updateUser } from '../store/actions/auth';


const Profile = ({ auth, loadUser, updateUser }) => {

  // load User
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // component state
  const [name, setName] = useState(auth.user ? auth.user.name : '');
  const [email, setEmail] = useState(auth.user ? auth.user.email : '');
  const [avatar, setAvatar] = useState(auth.user ? auth.user.avatar : '');

  // on change handler
  const onChangeName = e => setName(e.target.value);
  const onChangeEmail = e => setEmail(e.target.value);
  const onChangeAvatar = e => setAvatar(e.target.files[0]);

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(name, email, avatar);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="block">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <h1 className="title has-text-success">Update Profile</h1>
              <hr />
              <div className="columns is-flex is-centered">
                <figure className="image is-128x128">
                  <img
                    className="is-rounded"
                    src={
                      avatar
                        ? `http://localhost:5000/uploads/${avatar}`
                        : "https://via.placeholder.com/128x128"
                    }
                    alt="avatar"
                  />
                </figure>
              </div>

              <form onSubmit={(e) => onSubmit(e)}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => onChangeName(e)}
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
                      value={email}
                      onChange={(e) => onChangeEmail(e)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Avatar</label>
                  <div className="control">
                    <input
                      className="input"
                      type="file"
                      name="avatar"
                      onChange={(e) => onChangeAvatar(e)}
                    />
                  </div>
                </div>

                <hr />

                <div className="field">
                  <div className="control">
                    <button className="button is-success is-pulled-right">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {loadUser, updateUser})(Profile);
