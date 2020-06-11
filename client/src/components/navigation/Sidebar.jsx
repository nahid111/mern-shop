import React, { Fragment, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loadCategories } from "../../store/actions/shop";


const Sidebar = ({ categories, loadCategories }) => {
  // load categories
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <Fragment>
      <aside className="menu">
        <p className="menu-label">
          <b>Categories</b>
        </p>
        <ul id="menu" className="menu-list">
          {categories.map((item) => (
            <li key={item._id}>
              <Link to="#" className="">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </Fragment>
  );
};


Sidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  loadCategories: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
  categories: state.shop.categories
});


export default connect(mapStateToProps, {loadCategories})(Sidebar);
