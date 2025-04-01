import * as React from "react";
import { CircularProgress } from "@mui/material";

export default function LoadingCircle() {
  return (
    <center style={{ paddingTop: "50px" }}>
      <CircularProgress />;
    </center>
  );
}
