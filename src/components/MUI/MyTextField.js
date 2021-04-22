import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  //   console.log("field", field);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      style={{ width: "100%" }}
      label={props.label}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default MyTextField;
