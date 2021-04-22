import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  // AlertCircle as AlertCircleIcon,
  // BarChart as BarChartIcon,
  Lock as LockIcon,
  // Settings as SettingsIcon,
  // ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  // Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";
import InputIcon from "@material-ui/icons/Input";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";

// const user = {
//   avatar: "/static/images/avatars/avatar_6.png",
//   jobTitle: "Senior Developer",
//   name: "Katarina Smith",
// };

const items = [
  {
    href: "/app/video/add",
    icon: AddToQueueIcon,
    title: "Add Video",
  },
  {
    href: "/app/home",
    icon: PersonalVideoIcon,
    title: "Home",
  },
  {
    href: "/app/trends",
    icon: VideoLibraryIcon,
    title: "trends",
  },
  {
    href: "/app/account",
    icon: UserIcon,
    title: "Account",
  },
  // {
  //   href: "/app/settings",
  //   icon: SettingsIcon,
  //   title: "Settings",
  // },
  {
    href: "/login",
    icon: LockIcon,
    title: "Login",
  },
  {
    href: "/register",
    icon: UserPlusIcon,
    title: "Register",
  },
  {
    href: "/login",
    icon: InputIcon,
    title: "Logout",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  let User = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    onMobileClose();
  }, [location.pathname, onMobileClose]);
  const logoutFunc = () => dispatch(logout());
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          // src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {User?.username}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {User?.email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => {
            if (item.title === "Customers" && User?.role_type === "client") {
              return "";
            } else if (
              (item.title === "Register" && User) ||
              (item.title === "Login" && User)
            ) {
              return "";
            }
            return (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
                onClick={item.title === "Logout" ? logoutFunc : console.log("")}
              />
            );
          })}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: "background.default",
          m: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        ></Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
