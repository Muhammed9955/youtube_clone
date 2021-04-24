import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  // Button,
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
import { storage } from "../../firebase";

//aws s3
// import S3FileUpload from "react-s3";
// import { SettingsInputSvideoTwoTone } from "@material-ui/icons";
// import { uploadFile } from "react-s3";

//Optional Import
// import { deleteFile } from "react-s3";

// const config = {
//   bucketName: "videos-bucket-111",
//   dirName: "videos",
//   region: "eu-central-1",
//   accessKeyId: "AKIA6DFBKF7SX3BLUUX7",
//   secretAccessKey: "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",
// };

const AddVideoDetails = (props) => {
  const user = useSelector((state) => state.auth?.user);
  // const auth = useSelector((state) => state.auth);
  // console.log({ user });
  const [VideoUrl, setVideoUrl] = useState(null);
  const [Errors, setErrors] = useState(null);
  const [values, setValues] = useState("");
  const [loadingUplaod, setLoadingUplaod] = useState(false);

  console.log({ Errors });
  console.log({ values });
  console.log({ VideoUrl });

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
        // setErrors(
        //   err?.graphQLErrors[0]?.extensions.exception.data?.data[0].messages[0]
        //     .message
        // );
        // setErrors(err);
        console.log({ err });
    },
  });

  // //handel upload video
  // const handleVideoChange = (event) => {
  //   const VideoFile = event.target.files[0];
  //   console.log({ Video });
  //   // const formData = new FormData();
  //   // formData.append("video", Video, Video.name);
  //   // this.props.uploadImage(formData);
  //   // console.log({ formData: formData.get("video") });

  //   // S3FileUpload.uploadFile(Video, config)
  //   //   // uploadFile(Video, config)
  //   //   .then((data) => console.log({ data }))
  //   //   .catch((err) => console.error({ err }));

  //   if (VideoFile.type !== "video/mp4" || VideoFile.type !== "video/mkv") {
  //     setErrors("Please uplaod videos only ");
  //   } else {
  //     setErrors(null);
  //     console.log({ Errors });
  //     setVideo(VideoFile);
  //   }
  // };

  //handel upload video
  const handleVideoChange = (event) => {
    setLoadingUplaod(true);
    const VideoFile = event.target.files[0];
    const uplaodTask = storage.ref(`vidoes/${VideoFile?.name}`).put(VideoFile);
    console.log({ VideoFile });

    // setErrors(null);
    console.log({ Errors });
    uplaodTask.on(
      "state_changed",
      (snapshot) => {
        // progress func...
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // setProgress(progress);
      },
      (error) => {
        console.log({ error });
        // alert(error.message);
      },
      () => {
        // //   compelete func...
        // storage
        //   .ref("vidoes")
        //   .child(VideoFile?.name)
        //   .getDownloadURL()
        //   .then((url) => {
        //     // post image inside db
        //   });
        // // setProgress(0);
        // // setCaption("");

        uplaodTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            console.log({ downloadURL });
            setVideoUrl(downloadURL);
            setLoadingUplaod(false);
          })
          .catch((error) => {
            console.log(error);
            // setVideoUrl(null);
            setLoadingUplaod(false);
          });
      }
    );
    // if (VideoFile.type !== "video/mp4" || VideoFile.type !== "video/mkv") {
    //   setErrors("Please uplaod videos only ");
    // } else {
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

  //uplaod vidoe using firebase

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
                video_url: id ? oldVideo.video.video_url : VideoUrl,
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
              console.log({ fromData });
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
                    <Grid key={indx} item xs={i.xs} sm={i.sm}>
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
                  <LoadingButton
                    variant="contained"
                    startIcon={<AddToQueueIcon />}
                    onClick={handleEditPicture}
                    style={{ marginBottom: "1rem" }}
                    disabled={loadingUplaod}
                    loading={loadingUplaod}
                    title="Uplaod Video"
                  />

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
