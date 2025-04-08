import { Alert, Divider, LinearProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingCircle from "../LoadingCircle";

const ProgressDisplay = () => {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState("");
  const [loading, setLoading] = useState(true);

  const handleChange = ({ text, isProgressEvent }) => {
    if (isProgressEvent) {
      setCurrent(text);
      return;
    }
    setCurrent("");
    setItems((itms) => (itms.includes(text) ? itms : [text, ...itms]));
  };

  const setupListeners = () => {
    window.mainEvents.eventTrigger(handleChange);
    setLoading(false);
  };

  useEffect(() => {
    setupListeners();
  }, []);

  return loading ? (
    <LoadingCircle />
  ) : (
    <Stack spacing={2}>
      {current !== "" && <Alert severity="info">{current}</Alert>}
      {current !== "" && <LinearProgress value={parseInt(current.split("::").pop().replace("%", ""))} />}
      <Divider />
      {items.map((text, index) => (
        <Alert
          key={index}
          variant="filled"
          severity={"success"}>
          {text}
        </Alert>
      ))}
      <Divider />
    </Stack>
  );
};

export default ProgressDisplay;
