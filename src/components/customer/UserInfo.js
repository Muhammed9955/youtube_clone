import React from "react";
import { Grid, Paper } from "@material-ui/core";
import dayjs from "dayjs";

const UserInfo = ({ userFound, userInfoLoading }) => {
  return (
    <div className="h-2/5" style={{ height: "80vh" }}>
      <Paper style={{ padding: "2rem" }}>
        <Grid container>
          <Grid item sm={4} xs={12}>
            {`Usernmae: ${userFound?.username}`}
          </Grid>
          <Grid item sm={4} xs={12}>
            {`Email: ${userFound?.email}`}
          </Grid>
          <Grid item sm={4} xs={12}>
            {`JoinedAt: ${dayjs(userFound?.createdAt).format("DD/MM/YYYY")}`}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UserInfo;
