/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Cancel, Check } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";

const TabNameDialog = ({ isOpen, setOpen, onSubmit, currentTabs }) => {
  const [newTabName, setNewTabName] = useState("");
  const [errorText, setErrorText] = useState(null);

  const handleSubmit = () => {
    if (Boolean(newTabName.trim() === "")) {
      setErrorText("Tab Name needed");
      return;
    }
    if (currentTabs.indexOf(newTabName) !== -1) {
      setErrorText("Tab with that name already exists");
      return;
    }
    if (newTabName === "adder-tab") {
      setErrorText("Cannot give that name");
      return;
    }
    onSubmit(newTabName);
    setOpen(false);
    setErrorText(null);
    setNewTabName("");
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle sx={{ display: "flex" }}>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1 }}>
          Add New Tab
        </Typography>
        <IconButton
          color="error"
          onClick={() => {
            setOpen(false);
          }}>
          <Cancel />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormControl onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            fullWidth
            label="New Tab Name"
            variant="filled"
            value={newTabName}
            onChange={(e) => {
              setErrorText(null);
              setNewTabName(e.target.value);
            }}
            error={Boolean(errorText)}
            helperText={errorText}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {newTabName && (
                      <IconButton
                        color="success"
                        onClick={handleSubmit}>
                        <Check />
                      </IconButton>
                    )}
                  </InputAdornment>
                )
              }
            }}
          />
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default TabNameDialog;
