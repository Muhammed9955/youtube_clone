import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import OrderTable from "../Order/OrderTable";
import UserInfo from "./UserInfo";
import CustomerListToolbar from "./CustomerListToolbar";
import { useForm } from "../../utils/hooks";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto({
  userFound,
  userOrders,
  userInfoLoading,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [FilterTerm, setFilterTerm] = React.useState("");
  const [filterdOrders, setFilterdOrders] = React.useState(
    userOrders && userOrders
  );
  const { onChange, values } = useForm(() => {}, {
    searchText: "",
  });
  console.log({ values });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //filter orders by search
  useEffect(() => {
    let newOrders =
      userOrders &&
      userOrders.filter(
        (i) =>
          i.customer_name
            .toLowerCase()
            .includes(values.searchText.toLowerCase()) ||
          i?.user.username
            .toLowerCase()
            .includes(values.searchText.toLowerCase())
      );
    console.log({ newOrders });
    setFilterdOrders(newOrders);
  }, [values, userOrders]);
  console.log({ filterdOrders });
  console.log({ FilterTerm });

  // filter orders by status
  useEffect(() => {
    let newList = userOrders?.filter(
      (i) =>
        i.status?.toLowerCase().includes(FilterTerm?.toLowerCase()) ||
        (FilterTerm === "All" && i)
    );
    setFilterdOrders(newList);
    console.log({ newList });
  }, [FilterTerm, userOrders]);

  console.log({ userOrders });
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="User Info" {...a11yProps(0)} />
          <Tab label="User Orders" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <UserInfo userFound={userFound} userInfoLoading={userInfoLoading} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomerListToolbar
          onChange={onChange}
          values={values}
          search="searchText"
          showFilter
          setFilterTerm={setFilterTerm}
        />
        <Box sx={{ pt: 3 }}></Box>
      </TabPanel>
    </div>
  );
}
