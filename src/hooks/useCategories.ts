import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import categories, {
  selectCategories,
  getCategories,
} from "../store/categories";

const useCategories = () => {
  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return categories;
};

export default useCategories;
