import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";

const Page = ({ title, children }) => (
  <>
    <Helmet>
      <title> {title} </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
        marginBottom: "4rem",
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  </>
);

export default Page;
