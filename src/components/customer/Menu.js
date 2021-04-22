import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SimpleMenu({
  options,
  title,
  setFilterTerm,
  icon,
  nameProp,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (name) => {
    setName(name);
    setFilterTerm(name);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {name ? name : title}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options?.map((i) => (
          <MenuItem onClick={() => handleClose(i)}>{i} </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
