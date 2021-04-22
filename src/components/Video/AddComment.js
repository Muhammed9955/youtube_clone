import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  //   Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { CREATE_COMMENT, FETCH_VIDEO } from "../../utils/graphql";
import { useMutation } from "@apollo/client";
import Spinner from "../Spinner";
import LoadingButton from "../MUI/LoadingButton";
import { useParams } from "react-router";

const AddComment = ({ user, video }) => {
  // const auth = useSelector((state) => state.auth);
  // console.log({ user });
  const [Errors, setErrors] = useState("");
  console.log({ Errors });
  const { id } = useParams();
  //   console.log({ id });
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    update(client, { data: comment }) {
      console.log({ comment });
      const data = client.readQuery({
        query: FETCH_VIDEO,
        variables: {
          id,
        },
      });
      console.log({ videoFromComment: data });
      const Video = {
        ...data.video,
        comments: [comment.createComment.comment, ...data.video.comments],
      };
      console.log({ Video });
      client.writeQuery({
        query: FETCH_VIDEO,
        data: {
          video: Video,
        },
        variables: {
          id,
        },
      });
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

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <CardHeader title="Comments" subheader="" />
      <Divider />
      {loading ? (
        <Spinner height="20vh" />
      ) : (
        <CardContent>
          <Formik
            initialValues={{
              text: "",
            }}
            validationSchema={Yup.object().shape({
              text: Yup.string().max(255).required("comment is required"),
            })}
            onSubmit={(data) => {
              // navigate("/app/dashboard", { replace: true })
              const fromData = {
                text: data.text,
                user,
                video,
              };
              createComment({
                variables: {
                  data: fromData,
                },
              });
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      error={Boolean(touched.text && errors.text)}
                      fullWidth
                      helperText={touched.text && errors.text}
                      label="comment"
                      name="text"
                      // margin="normal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.text}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <div className="">
                  <div style={{ color: "red", marginTop: "1rem" }}>
                    {Errors && Errors}
                  </div>
                  <br />

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
                      title="Add Comment"
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

export default AddComment;
