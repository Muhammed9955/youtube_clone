import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReactPlayerCard from "../ReactPlayerCard";
import moment from "moment";
import { Avatar, Button, CardActions, Skeleton } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function VideoCard({ video, loading }) {
  const classes = useStyles();
  const reactPlayerStyle = {
    width: "",
    height: "",
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.media}>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={200}
            />
          ) : (
            <ReactPlayerCard style={reactPlayerStyle} />
          )}
        </div>
        {/* <CardMedia
          className={classes.media}
          image="https://cdn-endpoint-bdop11d.azureedge.net/wp-content/uploads/2019/02/video-placeholder.gif"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
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
              <Typography gutterBottom variant="h5" component="h2">
                {video?.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {/* {video?.description.slice(0, 20)} */}
                {video?.description.slice(0, 20)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {moment(video?.create_at).fromNow()}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/app/video/${video.id}`} style={{ color: "red" }}>
            Video Page
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
