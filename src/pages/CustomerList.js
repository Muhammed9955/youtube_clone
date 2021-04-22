import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import CustomerListResults from "../components/customer/CustomerListResults";
import CustomerListToolbar from "../components/customer/CustomerListToolbar";
// import customers from "../__mocks__/customers";
import { FETCH_USERS_QUERY } from "../utils/graphql";
import { useQuery } from "@apollo/client";
import { useForm } from "../utils/hooks";
import Spinner from "../components/Spinner";

const CustomerList = () => {
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  console.log({ data });
  console.log({ loading });

  const [filterdList, setFilterdList] = useState(data?.users);
  const { onChange, values } = useForm(() => {}, {
    searchText: "",
  });
  console.log({ values });

  useEffect(() => {
    let newList = data?.users.filter((i) =>
      i.username.toLowerCase().includes(values.searchText.toLowerCase())
    );
    setFilterdList(newList);
  }, [values, data]);

  return (
    <>
      <Helmet>
        <title>Customers | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar
            onChange={onChange}
            values={values}
            search="searchText"
          />
          <Box sx={{ pt: 3 }}>
            {loading ? (
              <Spinner />
            ) : (
              <CustomerListResults customers={filterdList} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
