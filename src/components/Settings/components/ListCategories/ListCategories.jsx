import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategories,
  selectDefaultCategory,
} from "../../../../store/categories/selectors";
import ItemCategory from "../ItemCategory";
import {
  deleteCategoryAction,
  changeCategoryTitleAction,
  changeDefaultCategoryAction,
} from "../../../../store/categories/reducer";

const ListCategories = ({ iconConnecter }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const defaultCategoryId = useSelector(selectDefaultCategory);

  const changeTitle = (id, title) => {
    dispatch(changeCategoryTitleAction({ id, title }));
  };

  const deleteItem = (id) => {
    dispatch(deleteCategoryAction({ id }));
    id === defaultCategoryId.id &&
      dispatch(
        changeDefaultCategoryAction({
          id: categories.find((item) => item).id,
        })
      );
  };

  return (
    <div>
      {"List of categories"}
      {categories.length ? (
        categories.map((item) => (
          <ItemCategory
            item={item}
            key={item.id}
            iconConnecter={iconConnecter}
            changeTitle={changeTitle}
            deleteItem={deleteItem}
          />
        ))
      ) : (
        <h2>No categories</h2>
      )}
    </div>
  );
};

ListCategories.propTypes = {
  iconConnecter: PropTypes.func,
};

export default ListCategories;
