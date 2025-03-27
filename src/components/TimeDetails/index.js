/* eslint-disable react/prop-types */
import { ArrowForward } from "@mui/icons-material";
import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { retrieve, store } from "../../utils/storage";
import { calculateTotalDuration, timeReduction } from "../../utils/time";
import TimeEntry from "../TimeEntry";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/configs";

const TimeDetails = ({ selected, pageKey }) => {
  const sectionKey = pageKey + "/data";
  const [data, setData] = useState(retrieve(sectionKey) || []);
  const [displayDuration, setDisplayDuration] = useState(calculateTotalDuration(data));

  useEffect(() => {
    store(sectionKey, data);
  }, [data]);

  const handleAdd = (values) => {
    setData((newData) => {
      const filteredList = timeReduction([...newData, values]);
      setDisplayDuration(calculateTotalDuration(filteredList));
      return filteredList;
    });
    window.location.reload();
  };

  const handleDelete = (index) => {
    setData((newData) => newData.filter((e, i) => i !== index));
  };

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={!selected}>
      <Stack spacing={2}>
        <br />
        <div>
          <Grid
            container
            size={12}>
            <Grid size={7}>
              <Typography
                variant="h5"
                component={"center"}
                color="primary">
                Total Duration:: {displayDuration}
              </Typography>
            </Grid>
            <Grid size={5}>
              <Link to={ROUTES.davinci}>
                <center>
                  <Button
                    variant="contained"
                    color="info"
                    size="small">
                    Use Timestamps
                    <ArrowForward />
                  </Button>
                </center>
              </Link>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid size={5}>
              <Typography
                variant="body"
                component={"center"}>
                Start Times
              </Typography>
            </Grid>
            <Grid size={5}>
              <Typography
                variant="body"
                component={"center"}>
                End Times
              </Typography>
            </Grid>
            <Grid size={2}>
              <Typography
                variant="body"
                component={"center"}
                color="secondary">
                Action
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            overflow: "hidden",
            overflowY: "auto",
            maxHeight: "55vh",
            height: "50vh"
          }}>
          <TimeEntry
            handleChange={handleAdd}
            disabled={false}
            data={[0, 0]}
          />
          {data.map((item, index) => (
            <TimeEntry
              handleChange={() => handleDelete(index)}
              disabled={true}
              key={index}
              index={index}
              data={item}
            />
          ))}
        </div>
      </Stack>
    </div>
  );
};
export default TimeDetails;
