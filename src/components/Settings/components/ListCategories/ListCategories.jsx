import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../../../store/categories/selectors";
import ItemCategory from "../ItemCategory";
import {
  changeCategoryTitle,
  deleteCategory,
} from "../../../../store/categories/reducer";

const ListCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const changeTitle = (id, title) => {
    if (title.trim() && title.length <= 15) {
      dispatch(changeCategoryTitle({ id, title }));
    }
  };

  const deleteItem = (id, isDefault) => {
    !isDefault && dispatch(deleteCategory(id));
  };

  return (
    <>
      <h2>List of categories</h2>
      {categories.length ? (
        categories.map((item) => (
          <ItemCategory
            item={item}
            key={item.id}
            changeTitle={changeTitle}
            deleteItem={deleteItem}
          />
        ))
      ) : (
        <h2>No categories</h2>
      )}
    </>
  );
};

ListCategories.propTypes = {
  getSvgIcon: PropTypes.func,
};

export default ListCategories;
