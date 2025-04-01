/* eslint-disable react/prop-types */
import React, { useState } from "react";
import hotkeys from "hotkeys-js";
import { Button, Modal, Paper, Stack, Typography } from "@mui/material";
import { KEYMAPPING } from "../../utils/configs";

const ShortcutInput = ({ isOpen, onSubmit }) => {
  const [shortcut, setShortcut] = useState("");

  hotkeys("*", { keydown: true, keyup: false }, () => {
    setShortcut(
      hotkeys
        .getPressedKeyString()
        .map((key) => KEYMAPPING[key] || key)
        .reverse()
        .join("+")
    );
  });

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
              {shortcut || "Enter a shortcut"}
            </Typography>
            <Stack
              spacing={5}
              direction="row">
              <Button
                disabled={!shortcut}
                size="large"
                onClick={() => {
                  onSubmit(shortcut);
                  setShortcut("");
                }}
                variant="contained"
                color="success">
                Submit
              </Button>
              <Button
                disabled={!shortcut}
                size="large"
                variant="contained"
                color="warning"
                onClick={() => setShortcut("")}>
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

export default ShortcutInput;
