import moment from "moment";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";

// const user = {
//   avatar: "/static/images/avatars/avatar_6.png",
//   city: "Los Angeles",
//   country: "USA",
//   jobTitle: "Senior Developer",
//   name: "Katarina Smith",
//   timezone: "GTM-7",
// };

const AccountProfile = (props) => {
  const user = useSelector((state) => state.auth?.user);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user?.username}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {` ${user?.email}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`JoinedAt: ${moment(user?.create_at).format("LL")} `}
          </Typography>
        </Box>
      </CardContent>
      {/* <Divider /> */}
      <CardActions>
        {/* <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
