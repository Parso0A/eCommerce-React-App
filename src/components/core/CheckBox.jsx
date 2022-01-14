import React, { useState, useEffect } from "react";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (categoryId) => () => {
    const newCheckedCategoryIds = [...checked];

    if (checked.indexOf(categoryId) === -1) {
      newCheckedCategoryIds.push(categoryId);
    } else {
      newCheckedCategoryIds.splice(checked.indexOf(categoryId), 1);
    }

    setChecked(newCheckedCategoryIds);
    handleFilters(newCheckedCategoryIds);
  };

  return categories.map((item, idx) => (
    <li key={item._id} className="list-unstyled">
      <div className="form-check">
        <input
          onChange={handleToggle(item._id)}
          value={checked.indexOf(item._id) === -1}
          type="checkbox"
          className="form-check-input"
        />
        <label className="form-check-label">{item.name}</label>
      </div>
    </li>
  ));
};

export default CheckBox;
