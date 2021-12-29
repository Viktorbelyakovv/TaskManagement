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
import {
  deleteCategoryServer,
  changeCategoryTitleServer,
  changeDefaultCategoryServer,
} from "../../../../utils/apiCategories";

const ListCategories = ({ iconConnecter }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const defaultCategoryId = useSelector(selectDefaultCategory);

  const changeTitle = (id, title) => {
    changeCategoryTitleServer(id, title).then(({ status }) => {
      if (status === 200) {
        dispatch(changeCategoryTitleAction({ id, title }));
      } else {
        alert("Error status = " + status);
      }
    });
  };

  const deleteItem = (id) => {
    deleteCategoryServer(id).then(({ status }) => {
      if (status === 200) {
        dispatch(deleteCategoryAction(id));
        if (id === defaultCategoryId.id) {
          changeDefaultCategoryServer({
            id: categories.find((item) => item).id,
          }).then(({ status }) => {
            if (status === 200) {
              dispatch(
                changeDefaultCategoryAction({
                  id: categories.find((item) => item).id,
                })
              );
            } else {
              alert("Error status = " + status);
            }
          });
        }
      } else {
        alert("Error status = " + status);
      }
    });
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
