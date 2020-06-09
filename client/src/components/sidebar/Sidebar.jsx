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
      <section class="main-content columns is-fullheight has-background-grey-light">
        <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
          <p class="menu-label is-hidden-touch">Categories</p>
          <ul class="menu-list">
            {categories.map((item) => (
              <li key={item._id}>
                <Link to="#" className="">{item.title}</Link>
              </li>
            ))}
          </ul>
        </aside>

      </section>
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
