import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import Tags from "../MUI/Tags";
import React from "react";
import { useUser } from "../../utils/hooks";
const options = ["All", "created", "processing", "delivered", "returned"];

const CustomerListToolbar = ({
  onChange,
  values,
  search,
  showFilter,
  setFilterTerm,
  topbtn,
  setselectedAreas,
  showSelect,
  btn,
  btnLink,
  ...otherprops
}) => {
  const navigate = useNavigate();
  console.log({ navigate });
  const { isAdmin } = useUser();

  return (
    <Box {...otherprops}>
      {topbtn && !isAdmin ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <Button>Import</Button> */}
          {/* <Button sx={{ mx: 1 }}>Export</Button> */}

          <Button
            color="primary"
            variant="contained"
            style={{ margin: "0 .5rem .5rem 0", background: "teal" }}
            onClick={() => navigate(`/app/order/create`)}
          >
            Add Order from stock
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ margin: "0 .5rem .5rem 0" }}
            onClick={() => navigate(`/app/order/create`)}
          >
            Add Order
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="primary"
            variant="contained"
            style={{ margin: "0 .5rem .5rem 0" }}
            onClick={() => navigate(`/app/${btnLink}`)}
          >
            {btn}
          </Button>
        </Box>
      )}
      <Box>
        <Card>
          <CardContent>
            <Box>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // background: "red",
                  width: "100%",
                }}
              >
                <TextField
                  fullWidth
                  style={{ maxWidth: "500px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search customer"
                  variant="outlined"
                  name={search}
                  onChange={onChange}
                  value={values[search]}
                />
                {showFilter && (
                  <div style={{ marginLeft: "1rem" }}>
                    <Menu
                      title="Filter by status"
                      options={options}
                      setFilterTerm={setFilterTerm}
                    />
                  </div>
                )}
              </div>
            </Box>
            {showSelect && (
              <Tags label="Select Area" setSelectedOptions={setselectedAreas} />
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerListToolbar;
