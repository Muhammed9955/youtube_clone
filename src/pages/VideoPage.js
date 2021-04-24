import { useMutation, useQuery } from "@apollo/client";
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useParams } from "react-router";
import VideoCard from "../components/home/VideoCard";
import Page from "../components/Page";
import ReactPlayerCard from "../components/ReactPlayerCard";
import AddComment from "../components/Video/AddComment";
import Comment from "../components/Video/Comment";
import { DELETE_VIDEO, FETCH_VIDEO, FETCH_VIDEOS } from "../utils/graphql";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AlertDialog from "../components/MUI/AlertDialog";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoPage = ({ video }) => {
  const user = useSelector((state) => state.auth?.user);
  const { id } = useParams();
  const { loading: loadingVideo, data } = useQuery(FETCH_VIDEO, {
    variables: {
      id,
    },
  });
  const { loading: loadingVidoes, data: videosData } = useQuery(FETCH_VIDEOS, {
    variables: {
      limit: 20,
    },
  });
  const [deleteVideo] = useMutation(DELETE_VIDEO, {
    update(client, { data }) {
      console.log({ deletedVideo: data });
    },
    variables: {
      id,
    },
  });

  console.log({ video: data?.video });
  console.log({ videos: videosData });

  return (
    <Page title={`${video?.title || "Video Page"}`}>
      <Grid container>
        <Grid item xl={8} lg={8} sm={8} xs={12}>
          <Grid container>
            <Grid
              item
              sm={12}
              xs={12}
              style={{ padding: "1rem", height: "60vh" }}
            >
              {loadingVideo ? (
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height="100%"
                />
              ) : (
                <ReactPlayerCard url={data?.video.video_url} />
              )}
            </Grid>
            <Grid item sm={12} xs={12} style={{ padding: "1rem" }}>
              <Paper>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "1rem",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      {data?.video?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data?.video?.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`${moment(data?.video?.create_at).format("LL")} `}
                    </Typography>
                  </div>
                  {data?.video?.owner.id === user?.id && (
                    <div style={{ padding: "1rem" }}>
                      <Link to={`/app/video/edit/${id}/`}>
                        <IconButton
                          // color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <EditIcon fontSize="medium" />
                        </IconButton>
                      </Link>

                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AlertDialog
                          icon={<DeleteIcon style={{ color: "red" }} />}
                          title="Delete Video Alert"
                          msg="Are you sure that you wanna remove this video?"
                          onAgree={() => {
                            deleteVideo();
                          }}
                        />
                      </IconButton>
                    </div>
                  )}
                </div>
              </Paper>
            </Grid>
            <Grid
              item
              sm={12}
              xs={12}
              style={{ padding: "1rem", height: "70vh", overflowY: "scroll" }}
            >
              <Paper style={{ padding: "1rem" }}>
                <Divider />
                <AddComment user={data?.video.owner.id} video={data?.video} />
                <br />
                <Divider />
                <div style={{ marginTop: "1rem" }}>
                  {data?.video.comments.map((i, indx) => (
                    <div key={i.id} style={{ marginTop: "1rem" }}>
                      <Comment comment={i} />
                    </div>
                  ))}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={4} xs={12} style={{ padding: "1rem" }}>
          <Grid>
            {videosData?.videos.map((i, indx) => (
              <div key={i.id} style={{ marginBottom: "1rem" }}>
                {loadingVidoes ? (
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width={300}
                    height={200}
                  />
                ) : (
                  <Link key={i.id} to={`/app/video/${i.id}`}>
                    <VideoCard video={i} loading={loadingVideo} />
                  </Link>
                )}
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default VideoPage;
