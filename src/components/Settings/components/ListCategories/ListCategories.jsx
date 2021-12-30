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

const ListCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const defaultCategory = useSelector(selectDefaultCategory);

  const changeTitle = (id, title) => {
    if (title.trim() && title.length <= 15) {
      changeCategoryTitleServer(id, title).then(({ status }) => {
        if (status === 200) {
          dispatch(changeCategoryTitleAction({ id, title }));
        } else {
          console.log("Error status = " + status);
        }
      });
    }
  };

  const deleteItem = (id) => {
    deleteCategoryServer(id).then(({ status }) => {
      if (status === 200) {
        dispatch(deleteCategoryAction(id));

        if (id === defaultCategory.id) {
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
              console.log("Error status = " + status);
            }
          });
        }
      } else {
        console.log("Error status = " + status);
      }
    });
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
