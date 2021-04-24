import {
  Link,
} from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  // Badge,
  // Fab,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
// import Logo from './Logo';
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import InputIcon from "@material-ui/icons/Input";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import { User as UserIcon } from "react-feather";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const dispatch = useDispatch();
  // const [notifications] = useState([]);
  const logoutFunc = () => {
    dispatch(logout());
    console.log("clicked");
  };

  return (
    <AppBar
      elevation={0}
      position="fixed"
      color="primary"
      // className={classes.appBar}
      style={{
        top: "auto",
        bottom: 0,
        marginTop: "1rem",
      }}
    >
      <Hidden lgUp>
        <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to="/login" style={{ color: "white" }} onClick={logoutFunc}>
          <IconButton color="inherit" >
            <InputIcon />
          </IconButton>
          </Link>
          <Link to="/app/home" style={{ color: "white" }}>
            <IconButton color="inherit">
              <PersonalVideoIcon />
            </IconButton>
          </Link>
          <Link to="/app/video/add" style={{ color: "white" }}>
            <IconButton color="inherit">
              <AddToQueueIcon />
            </IconButton>
          </Link>
          <Link to="/app/trends" style={{ color: "white" }}>
            <IconButton color="inherit">
              <VideoLibraryIcon />
            </IconButton>
          </Link>
          <Link to="/app/account" style={{ color: "white" }}>
            <IconButton color="inherit">
              <UserIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </Hidden>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
