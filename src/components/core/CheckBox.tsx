import React, { useState, useEffect } from "react";
import { Category } from "../../interfaces";

interface CheckBoxProps {
  categories: Array<Category>;
  handleFilters: Function;
}

const CheckBox = ({ categories, handleFilters }: CheckBoxProps) => {
  const [checked, setChecked] = useState<Array<string>>([]);

  const handleToggle = (categoryId: string) => () => {
    const newCheckedCategoryIds = [...checked];

    if (checked.indexOf(categoryId) === -1) {
      newCheckedCategoryIds.push(categoryId);
    } else {
      newCheckedCategoryIds.splice(checked.indexOf(categoryId), 1);
    }

    setChecked(newCheckedCategoryIds);
    handleFilters(newCheckedCategoryIds);
  };

  return (
    <React.Fragment>
      {categories.map((item, idx) => (
        <li key={item._id} className="list-unstyled">
          <div className="form-check">
            <input
              onChange={handleToggle(item._id)}
              value={checked.indexOf(item._id) === -1 ? "false" : "true"}
              type="checkbox"
              className="form-check-input"
            />
            <label className="form-check-label">{item.name}</label>
          </div>
        </li>
      ))}
    </React.Fragment>
  );
};

export default CheckBox;
