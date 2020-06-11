import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAlert } from "../store/actions/alert";


const Alert = (props) => {
  if (props.alerts === null || props.alerts.length === 0) {
    return null;
  }

  const remove_alert = (id) => {
    props.removeAlert(id);
  }

  return props.alerts.map((alert) => (
    <div className="block" key={alert.id}>
      <div className={`notification is-${alert.alertType} is-light isoutlined`}>
        <button
          className="delete"
          onClick={(e) => remove_alert(alert.id)}
        ></button>
        {alert.msg}
      </div>
    </div>
  ));
};


Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
  alerts: state.alert,
});


export default connect(mapStateToProps, { removeAlert })(Alert);
