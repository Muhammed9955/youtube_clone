import { Link as RouterLink, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import Spinner from "../components/Spinner";
import {
  Box,
  Button,
  // Checkbox,
  Container,
  // FormHelperText,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { REGISTER_USER } from "../utils/graphql";
import { useMutation } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/auth";

const Register = () => {
  let isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [Errors, setErrors] = useState("");
  const [User, setUser] = useState(null);

  console.log({ User });
  console.log({ Errors });
  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      // props.history.push('/');
      dispatch(login(userData));
      setUser(userData);
      setErrors(null);
      console.log({ userData });
    },
    onError(err) {
      err &&
        setErrors(
          err?.graphQLErrors[0]?.extensions.exception.data.data[0].messages[0]
            .message
        );
      setUser(null);
      console.log({ err });
    },
    // variables: values,
  });

  if (loading) {
    return <Spinner />;
  } else if (!loading && isAuthenticated) {
    return <Navigate to="/app/home" />;
  }

  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              username: Yup.string().max(255).required("username is required"),
              password: Yup.string()
                .max(255)
                .required("password is required")
                .min(6, "Password is too short - should be 6 chars minimum.")
                // .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
                .max(20, "Too Long!"),
              passwordConfirmation: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
            })}
            onSubmit={(data) => {
              // navigate("/app/dashboard", { replace: true });
              register({
                variables: data,
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
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // onChange={onChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  // error={Boolean(touched.password && errors.password)}
                  error={!!errors.password}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={!!errors.passwordConfirmation}
                  fullWidth
                  helperText={touched.password && errors.passwordConfirmation}
                  label="Password Confirmation"
                  margin="normal"
                  name="passwordConfirmation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.passwordConfirmation}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                  }}
                >
                  {/* <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  /> */}
                  {/* <Typography color="textSecondary" variant="body1">
                    I have read the{" "}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography> */}
                </Box>
                {/* {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )} */}
                {Errors && Errors}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
