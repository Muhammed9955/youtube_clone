import { useState } from 'react';
import {
  Link as RouterLink
  // Navigate
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
// import Logo from './Logo';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const dispatch = useDispatch();
  const [notifications] = useState([]);
  const logoutFunc = () => {
    dispatch(logout());
    console.log('clicked');
  };

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">{/* <Logo /> */}</RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              // badgeContent={5}
              badgeContent={notifications.length}
              color="secondary"
              // variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <RouterLink to="/login" onClick={logoutFunc}>
            <InputIcon style={{ color: 'white' }} />
          </RouterLink>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
