import { Link as RouterLink, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  // Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
// import FacebookIcon from "../icons/Facebook";
// import GoogleIcon from "../icons/Google";

//new
import { useMutation, gql } from "@apollo/react-hooks";
import { useState } from "react";
import { login } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
// import Spinner from "../components/Spinner";

const Login = () => {
  let userFound = useSelector((state) => state.auth?.user);
  let isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [Errors, setErrors] = useState("");
  const [User, setUser] = useState(null);

  console.log({ User });
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      dispatch(login(userData));
      setUser(userData);
      setErrors(null);
      console.log({ userData });
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
    // variables: values,
  });

  console.log({ Errors });
  console.log({ loading });
  console.log({ userFound });

  if (loading) {
    return <Spinner />;
  } else if (!loading && isAuthenticated) {
    return <Navigate to="/app/home" />;
  }
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
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
              identifier: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              identifier: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={(data) => {
              // navigate("/app/dashboard", { replace: true });
              loginUser({
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
              // <form onSubmit={onSubmit}>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.identifier && errors.identifier)}
                  fullWidth
                  helperText={touched.identifier && errors.identifier}
                  label="Email Address"
                  margin="normal"
                  name="identifier"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // onChange={onChange}
                  type="email"
                  value={values.identifier}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // onChange={onChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <div
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    {Errors && Errors}
                  </div>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
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
const LOGIN_USER = gql`
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
        confirmed
        blocked
        role {
          id
          name
          description
        }
        # role_type
      }
    }
  }
`;
export default Login;
