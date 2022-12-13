import React from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../store/galleries/slice";
import { selectSearchterm } from "../store/galleries/selector";

export default function CarsSearchComponent() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);

  const handleChange = debounce(async ({ target: { value } }) => {
    dispatch(setSearchTerm(value));
  }, 500);

  return (
    <input
      className="input-padding-y position-relative ms-5"
      type="text"
      placeholder="Search for..."
      defaultValue={searchTerm}
      onChange={handleChange}
    />
  );
}
