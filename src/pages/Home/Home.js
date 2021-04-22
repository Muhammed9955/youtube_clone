import React from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import VideoCard from "../../components/home/VideoCard";
import Page from "../../components/Page";
import { FETCH_VIDEOS } from "../../utils/graphql";
import Spinner from "../../components/Spinner";

const Home = () => {
  const { loading, data } = useQuery(FETCH_VIDEOS, {
    variables: {
      limit: 50,
    },
  });
  console.log({ vidoes: data?.videos });
  return (
    <Page title="Home Page">
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={3}>
          {data?.videos.map((i, indx) => (
            <Grid key={i.id} item xl={3} lg={3} sm={3} xs={12}>
              <VideoCard video={i} loading={loading} />
            </Grid>
          ))}
        </Grid>
      )}
    </Page>
  );
};

export default Home;
