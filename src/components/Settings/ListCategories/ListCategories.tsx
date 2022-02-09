import React, { FC } from "react";
import { useAppSelector } from "../../../hooks/useTypedStore";
import {
  getCategories,
  getCategoriesLoading,
  getCategoriesError,
} from "../../../store/categories/selectors";
import { CategoryItemType } from "../../../types/types";
import ItemCategory from "../ItemCategory";
import Loader from "../../Loader";
import Error from "../../Error";

const ListCategories: FC = () => {
  const categories = useAppSelector(getCategories);
  const loading = useAppSelector(getCategoriesLoading);
  const error = useAppSelector(getCategoriesError);

  if (error) return <Error message={"Error downloading categories"} />;

  if (loading === "pending") return <Loader />;

  if (!categories.length) return <h2>No categories</h2>;

  return (
    <div className="ListTasks">
      {categories.map((item: CategoryItemType) => (
        <ItemCategory item={item} key={item.id} />
      ))}
    </div>
  );
};

export default ListCategories;
