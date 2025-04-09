/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Modal, Paper, Stack, Typography } from "@mui/material";

const ScreenPointInput = ({ isOpen, onSubmit }) => {
  const [point, setPoint] = useState({});

  useEffect(() => {
    window.onblur = isOpen ? handleSelection : null;
  }, [isOpen]);

  const handleSelection = () => window.mouseEvents.getMousePosition().then(setPoint);

  return (
    <Modal
      open={isOpen}
      style={{
        position: "absolute",
        top: "20%",
        left: "0%"
      }}>
      <center>
        <Paper>
          <Stack
            spacing={5}
            sx={{
              justifyContent: "center",
              alignItems: "center"
            }}>
            <div></div>
            <Typography
              variant="h6"
              color="info">
              Click on the desired location
            </Typography>
            <Typography
              variant="h6"
              color="info">
              {[point?.x ?? "-", point?.y ?? "-"].join(",")}
            </Typography>
            <Stack
              spacing={5}
              direction="row">
              <Button
                disabled={!point.x}
                size="large"
                onClick={() => {
                  onSubmit([point.x, point.y]);
                  setPoint({});
                }}
                variant="contained"
                color="success">
                Submit
              </Button>
              <Button
                disabled={!point.x}
                size="large"
                onClick={() => {
                  setPoint({});
                }}
                variant="contained"
                color="error">
                Clear
              </Button>
            </Stack>
            <div></div>
          </Stack>
        </Paper>
      </center>
    </Modal>
  );
};

export default ScreenPointInput;
