/* eslint-disable react/prop-types */
import { Alert, Button, Divider, LinearProgress, Stack } from "@mui/material";
import React, { useState } from "react";

const ProgressDisplay = ({ setIsProcessing }) => {
  const [items, setItems] = useState([
    { type: "success", text: "test1" },
    { type: "warning", text: "test2" }
  ]);
  const [current, setCurrent] = useState("Setting Up...");
  const [progress, setProgress] = useState(0);
  const [stoppable, setStoppable] = useState(true);

  const handleStoppage = () => {
    setIsProcessing(false);
  };

  //   Node side event listeners

  return (
    <Stack spacing={2}>
      <Divider />
      {items.map((item, index) => (
        <Alert
          key={index}
          severity={item.type}>
          {item.text}
        </Alert>
      ))}
      <Divider />
      <Alert severity="info">{current}</Alert>
      <LinearProgress value={progress} />
      <Divider />
      <Button
        variant="contained"
        color="error"
        onClick={handleStoppage}
        disabled={!stoppable}>
        Stop Process
      </Button>
    </Stack>
  );
};

export default ProgressDisplay;
