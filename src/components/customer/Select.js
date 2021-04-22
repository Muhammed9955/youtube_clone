import React from "react";
import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import { InputLabel } from "@material-ui/core";

const SelectComponent = ({ options }) => {
  console.log({ options });
  return (
    <div>
      {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

      {/* <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={age}
      onChange={handleChange}
      >
        {options.map((i, indx) => (
          <MenuItem key={indx} value={i}>
            {i}
          </MenuItem>
        ))}
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select> */}

      <select
        className={`w-full  bg-white rounded px-3  outline-none`}
        name="role"
        // value={values && values["role"]}
        // onChange={onChange}
      >
        <option className="py-1" disabled>
          *Select role
        </option>

        {options &&
          options?.map((i, indx) => (
            <option value={i.name} key={indx} className="py-1">
              {i.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
