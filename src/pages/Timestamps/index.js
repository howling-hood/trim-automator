import React, { useEffect, useState } from "react";

import { Add, Delete } from "@mui/icons-material";
import { IconButton, Tab, Tabs, Tooltip, Typography } from "@mui/material";

import TimeDetails from "../../components/TimeDetails";
import TabNameDialog from "../../components/TabNameDialog";
import { retrieve, store } from "../../utils/storage";

const TimestampPage = () => {
  const pageKey = "TimestampPage/";
  const [tabList, setTabList] = useState(retrieve(pageKey + "tabs") ?? ["laughs", "smiles"]);
  const [selected, setSelected] = useState(retrieve(pageKey + "selected") ?? "laughs");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    store(pageKey + "tabs", tabList);
  }, [tabList]);

  useEffect(() => {
    store(pageKey + "selected", selected);
  }, [selected]);

  const handleSelection = (e, newValue) => {
    setSelected(newValue);
  };

  const handleAddition = (name) => {
    setTabList((tabs) => [...tabs, name]);
    setSelected(name);
  };

  const handleDelete = (label) => {
    setTabList((tabs) => {
      const filtered = tabs.filter((tab) => tab !== label);
      setSelected(filtered[0] ?? "adder-tab");
      return filtered;
    });
  };

  return (
    <>
      <Tabs
        value={selected}
        onChange={handleSelection}
        variant="fullWidth"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary">
        {tabList.map((label, index) => (
          <Tab
            key={index}
            value={label}
            label={
              <Typography
                variant="body"
                color="primary">
                {label}
                <Tooltip title={`delete ${label}`}>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(label)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Typography>
            }
          />
        ))}
        <Tab
          value={"adder-tab"}
          onClick={() => setAdding(true)}
          icon={
            <Tooltip title="Add new Tab">
              <IconButton color="primary">
                <Add color="inherit" />
              </IconButton>
            </Tooltip>
          }
        />
      </Tabs>
      {tabList.map((label) => (
        <TimeDetails
          key={label}
          pageKey={label}
          selected={label === selected}
        />
      ))}
      <TabNameDialog
        isOpen={adding}
        setOpen={setAdding}
        onSubmit={handleAddition}
        currentTabs={tabList}
      />
    </>
  );
};
export default TimestampPage;
