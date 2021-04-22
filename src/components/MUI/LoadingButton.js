import React from "react";
import { Button, CircularProgress } from "@material-ui/core";

const LoadingButton = ({ title, loading, ...otherProps }) => {
  return (
    <Button
      {...otherProps}
      type="submit"
      variant="contained"
      color="primary"
      // className={classes.button}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "8rem",
      }}
      disabled={loading}
    >
      {loading ? <CircularProgress size={30} /> : title}
    </Button>
  );
};

export default LoadingButton;
