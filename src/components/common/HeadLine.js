import { Box, Grid } from "@material-ui/core";
import React from "react";

const Headline = ({ title, subtitle}) => {
  return (
    <Grid
      container
      style={{
        justifyContent: "center",
        borderBottom: "2px solid #dee2e6",
        marginTop: "30px",
        marginBottom:"10px",
      }}
    >
      <Box
        style={{
          fontSize: "20px",
          textTransform: "uppercase",
          color: "red",
          marginRight: "10px",
        }}
      >
        {title}
      </Box>
      <Box
        style={{
          fontSize: "20px",
          textTransform: "uppercase",
          color: "#185137",
        }}
      >
        {subtitle}
      </Box>
    </Grid>
  );
};
export default Headline;