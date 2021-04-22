import { CircularProgress } from "@material-ui/core";
import React from "react";

const Spinner = ({ size, height }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: height ? height : "90vh",
      }}
      className="flex justify-center items-center mt-40 "
    >
      <CircularProgress
        style={{
          margin: "auto",
          // color: "",
          width: size && size === "small" ? "1.5rem" : "4rem",
          height: size && size === "small" ? "1.5rem" : "4rem",
        }}
      />
    </div>
  );
};

export default Spinner;
