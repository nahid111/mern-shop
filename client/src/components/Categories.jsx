import React from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const Categories = (props) => {
    return (
        <div>
            Categories
        </div>
    )
}

Categories.propTypes = {
  auth: PropTypes.object.isRequired
};
  
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Categories);
