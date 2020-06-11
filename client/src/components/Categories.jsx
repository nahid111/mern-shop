import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCategories, deleteCategory, addCategory } from "../store/actions/shop";
import Spinner from "./spinner/Spinner.jsx";


const Categories = ({ auth:{ loading },categories, loadCategories, deleteCategory, addCategory }) => {
  // load categories
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const [addInput, setAddInput] = useState('');
  
  const onDeleteItem = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteCategory(e.target.id);
    }
  }
  
  const onSubmitItem = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you wish to Add ${addInput}?`)) {
      addCategory(addInput);
      setAddInput('');
    }
  }

  let tblRowCount = 0;
  const getRowCount = () => {
    tblRowCount+=1;
    return tblRowCount;
  }

  return (
    <Fragment>
      <h1 className="is-size-3 has-text-centered">Mange Categories</h1>
      <hr />

      <div className="level">
        <div className="level-left"></div>
        <div className="level-right">
          <div className="field has-addons">
            <p className="control">
              <input
                className="input"
                type="text"
                value={addInput}
                onChange={(e) => setAddInput(e.target.value)}
              />
            </p>
            <p className="control">
              <button
                className="button is-primary is-light is-outlined"
                onClick={(e) => onSubmitItem(e)}
              >
                Add Category
              </button>
            </p>
          </div>
        </div>
      </div>

      {loading && <Spinner />}

      <table className="table">
        <thead>
          <tr className="has-text-centered">
            <th>sl</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => (
            <tr key={item._id}>
              <td>{getRowCount()}</td>
              <td>{item.title}</td>
              <td>
                <button
                  className="button is-danger is-outlined is-small"
                  id={item._id}
                  onClick={(e) => onDeleteItem(e)}
                >
                  <span id={item._id}>Delete</span>
                  <span className="icon is-small" id={item._id}>
                    <i className="fas fa-times" id={item._id}></i>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};


Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  addCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  categories: state.shop.categories,
  auth: state.auth,
});


export default connect(mapStateToProps, { loadCategories, deleteCategory, addCategory })(Categories);
