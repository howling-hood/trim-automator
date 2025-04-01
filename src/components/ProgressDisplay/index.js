/* eslint-disable react/prop-types */
import { Alert, Button, Divider, LinearProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingCircle from "../LoadingCircle";

const ProgressDisplay = ({ setIsProcessing }) => {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState("");
  const [progress, setProgress] = useState(0);
  const [stoppable, setStoppable] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleStoppage = () => {
    setIsProcessing(false);
  };

  const setupListeners = () => {
    setLoading(false);
  };
  useEffect(() => {
    setupListeners();
  }, []);

  return loading ? (
    <LoadingCircle />
  ) : (
    <Stack spacing={2}>
      <Divider />
      <Button
        variant="contained"
        color="error"
        onClick={handleStoppage}
        disabled={!stoppable}>
        Stop Process
      </Button>
      <Divider />
      <Alert severity="info">{current}</Alert>
      <LinearProgress value={progress} />
      <Divider />
      {items.reverse().map((item, index) => (
        <Alert
          key={index}
          severity={item.type}>
          {item.text}
        </Alert>
      ))}
    </Stack>
  );
};

export default ProgressDisplay;
