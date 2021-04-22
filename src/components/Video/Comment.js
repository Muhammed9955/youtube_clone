import { Avatar, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";

const Comment = ({ comment }) => {
  return (
    <div style={{ display: "flex" }}>
      <Avatar
        alt="Remy Sharp"
        // src="/static/images/avatar/1.jpg"
        style={{ width: "3rem", height: "3rem" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "1rem",
        }}
      >
        <div style={{ display: "flex" }}>
          <Typography
            variant="body2"
            component="h2"
            style={{ marginRight: "1rem" }}
          >
            {comment.user.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {moment(comment.created_at).fromNow()}
          </Typography>
        </div>
        <div>{comment.text}</div>
      </div>
    </div>
  );
};

export default Comment;
