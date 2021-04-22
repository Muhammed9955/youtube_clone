import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { CREATE_VIDEO, FETCH_VIDEO, UPDATE_VIDEO } from "../../utils/graphql";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "../Spinner";
import { inputsData } from "./data";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import LoadingButton from "../MUI/LoadingButton";
import { useParams } from "react-router";

const AddVideoDetails = (props) => {
  const user = useSelector((state) => state.auth?.user);
  // const auth = useSelector((state) => state.auth);
  // console.log({ user });
  const [Errors, setErrors] = useState("");
  const [values, setValues] = useState("");
  console.log({ Errors });
  console.log({ values });

  const [createVideo, { loading }] = useMutation(CREATE_VIDEO, {
    update(_, { data: videoData }) {
      console.log({ videoData });
    },
    onError(err) {
      err &&
        setErrors(
          err?.graphQLErrors[0]?.extensions.exception.data?.data[0].messages[0]
            .message
        );
      // setErrors(err);
      console.log({ err });
    },
  });
  const [updateVideo] = useMutation(UPDATE_VIDEO, {
    update(_, { data: videoData }) {
      console.log({ videoData });
    },
    onError(err) {
      err &&
        setErrors(
          err?.graphQLErrors[0]?.extensions.exception.data?.data[0].messages[0]
            .message
        );
      // setErrors(err);
      console.log({ err });
    },
  });

  //handel upload video
  const handleVideoChange = (event) => {
    const Video = event.target.files[0];
    console.log({ Video });
    const formData = new FormData();
    formData.append("video", Video, Video.name);
    // this.props.uploadImage(formData);
    console.log({ formData: formData.get("video") });

    // if (Video.type !== "video/mp4" || Video.type !== "video/ogg") {
    //   setErrors("Please uplaod videos only ");
    // } else {
    //   setErrors("");
    //   console.log({ Errors });
    // }
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const { id } = useParams();
  const { loading: loadingOldVideo, data: oldVideo } = useQuery(FETCH_VIDEO, {
    variables: {
      id,
    },
  });
  console.log({ oldVideo });
  console.log({ loadingOldVideo });

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <CardHeader
        title={id ? "Edit Video" : "Add Video"}
        subheader="The information can be edited"
      />
      <Divider />
      {loading ? (
        <Spinner height="20vh" />
      ) : (
        <CardContent>
          <Formik
            enableReinitialize={true}
            initialValues={{
              title: oldVideo ? oldVideo?.video.title : "",
              description: oldVideo ? oldVideo?.video.description : "",
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().max(255).required("Title is required"),
              description: Yup.string()
                .max(255)
                .required("Description is required"),
            })}
            onSubmit={(data) => {
              // navigate("/app/dashboard", { replace: true });
              const fromData = {
                title: data.title,
                description: data.description,
                channel_Title: "",
                channel_Id: "",
                owner: user.id,
                video_url: "url",
              };
              id
                ? updateVideo({
                    variables: {
                      id,
                      data: fromData,
                    },
                  })
                : createVideo({
                    variables: {
                      data: fromData,
                    },
                  });
              setValues(data);
              console.log({ data });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              // <form onSubmit={onSubmit}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {inputsData.map((i, indx) => (
                    <Grid item xs={i.xs} sm={i.sm}>
                      <TextField
                        error={Boolean(touched.title && errors.title)}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label={i.label}
                        name={i.name}
                        // margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[i.name]}
                        variant="outlined"
                        multiline={i.multiline}
                        rows={3}
                      />
                    </Grid>
                  ))}
                </Grid>
                <div className="">
                  <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={handleVideoChange}
                  />
                  <div style={{ color: "red", marginTop: "1rem" }}>
                    {Errors && Errors}
                  </div>
                  <br />
                  <Button
                    variant="contained"
                    startIcon={<AddToQueueIcon />}
                    onClick={handleEditPicture}
                    style={{ marginBottom: "1rem" }}
                  >
                    Upload Video
                  </Button>

                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      p: 2,
                    }}
                  >
                    <LoadingButton
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      title="Save"
                      loading={isSubmitting}
                    />
                  </Box>
                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      )}
    </Card>
  );
};

export default AddVideoDetails;
