/* eslint-disable react/prop-types */
import { Alert, Divider, LinearProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingCircle from "../LoadingCircle";

const ProgressDisplay = ({ setIsProcessing }) => {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (text, progress) => {
    if (progress) {
      setCurrent(text);
      setProgress(progress);
      return;
    }
    setItems((itms) => (itms.includes(text) ? itms : [text, ...itms]));
  };

  const handleBeginProcess = () => {
    const text = "Process started";
    handleChange(text);
  };
  const handleBeginSetup = () => {
    const text = "Setup started";
    handleChange(text);
  };
  const handleEndSetup = () => {
    const text = "Setup done";
    handleChange(text);
  };
  const handleBeginTimeConversion = () => {
    const text = "Time Conversion started";
    handleChange(text);
  };
  const handleTimeConversionProgress = (percent) => {
    const text = `Time Conversion Progress:: ${percent}%`;
    handleChange(text, percent);
  };
  const handleEndTimeConversion = () => {
    const text = "Time Conversion Completed";
    handleChange(text);
  };
  const handleBeginCutPhase = () => {
    const text = "Cut Phase started";
    handleChange(text);
  };
  const handleCutPhaseProgress = (percent) => {
    const text = `Cut Phase Progress:: ${percent}%`;
    handleChange(text, percent);
  };
  const handleEndCutPhase = () => {
    const text = "Cut Phase Completed";
    handleChange(text);
  };
  const handleEndProcess = () => {
    const text = "Process Completed";
    handleChange(text);
    setCurrent("");
    setProgress(0);
  };

  const setupListeners = () => {
    window.mainEvents.onBeginProcess(handleBeginProcess);
    window.mainEvents.onBeginSetup(handleBeginSetup);
    window.mainEvents.onEndSetup(handleEndSetup);
    window.mainEvents.onBeginTimeConversion(handleBeginTimeConversion);
    window.mainEvents.onTimeConversionProgress(handleTimeConversionProgress);
    window.mainEvents.onEndTimeConversion(handleEndTimeConversion);
    window.mainEvents.onBeginCutPhase(handleBeginCutPhase);
    window.mainEvents.onCutPhaseProgress(handleCutPhaseProgress);
    window.mainEvents.onEndCutPhase(handleEndCutPhase);
    window.mainEvents.onEndProcess(handleEndProcess);
    setLoading(false);
  };
  useEffect(() => {
    setupListeners();
  }, []);

  return loading ? (
    <LoadingCircle />
  ) : (
    <Stack spacing={2}>
      {current && <Alert severity="info">{current}</Alert>}
      {progress > 0 && <LinearProgress value={progress} />}
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
