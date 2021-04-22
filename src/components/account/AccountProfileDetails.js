import { useState } from "react";
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
import { UPDATE_USER } from "../../utils/graphql";
import { useMutation } from "@apollo/client";
import Spinner from "../Spinner";

const OrderDetails = (props) => {
  const user = useSelector((state) => state.auth?.user);
  const auth = useSelector((state) => state.auth);
  // console.log({ user });
  const [values, setValues] = useState({
    username: user?.username,
    email: user?.email,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(_, { data: userData }) {
      console.log({ userData });
    },
    variables: {
      id: auth.token.id,
      data: values,
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };
  return (
    <form onSubmit={onSubmit} autoComplete="off" noValidate {...props}>
      <Card style={{ marginBottom: "1rem" }}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        {loading ? (
          <Spinner height="20vh" />
        ) : (
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify your username"
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  required
                  value={values.username}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        )}
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save Details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default OrderDetails;
