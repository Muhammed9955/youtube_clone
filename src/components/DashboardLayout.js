import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { experimentalStyled } from "@material-ui/core";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useQuery } from "@apollo/client";
import { loadUser } from "../redux/actions/auth";
import { FETCH_USER_QUERY } from "../utils/graphql";

const DashboardLayoutRoot = experimentalStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const DashboardLayoutWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 256,
  },
}));

const DashboardLayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const DashboardLayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  //load user logic
  const dispatch = useDispatch();
  // console.log(localStorage.getItem("jwtToken"));
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const id = decodedToken?.id;
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      id: id.toString(),
    },
  });

  console.log({ loadUserData: data });
  // console.log({ decodedToken });
  // console.log({ id });
  // console.log({ loading });
  useEffect(() => {
    dispatch(loadUser(data?.user));
  }, [data, dispatch]);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
