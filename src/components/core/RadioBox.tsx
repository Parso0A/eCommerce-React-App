import React, { useState, useEffect, Fragment } from "react";
import { PriceFilterItem } from "../../global/models/common/common";

interface RadioBoxProps {
  prices: Array<PriceFilterItem>;
  handleFilters: Function;
}

const RadioBox = ({ prices, handleFilters }: RadioBoxProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);

    setValue(event.target.value);
  };

  return (
    <Fragment>
      {prices.map((item, idx) => (
        <div key={item._id}>
          <input
            onChange={handleChange}
            value={`${item._id}`}
            type="radio"
            className="mx-1"
            name={"priceFilter"}
          />
          <label className="form-check-label">{item.name}</label>
        </div>
      ))}
    </Fragment>
  );
};

export default RadioBox;
