/* eslint-disable react/prop-types */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { ArrowBack, ArrowForward, Info } from "@mui/icons-material";

const pageAssociations = [
  {
    path: "\/",
    title: "Gather Page",
    info: "Keep a separated list of timestamps with total time being calculated",
    next: true,
    back: false
  },
  {
    path: "/reduce",
    title: "Reduce Page",
    info: "Put in the timestamps and let us do the magic of merging close timestamps",
    next: true,
    back: true
  },
  {
    path: "/cutter",
    title: "Cutter Page",
    info: "Create cuts in davinci resolve current clip just in a click",
    next: false,
    back: true
  }
];

const NavButton = ({ Icon, pageDetails }) => (
  <Link to={pageDetails.path}>
    <Typography
      variant="h6"
      component="div"
      color="white">
      <Tooltip
        title={
          <Typography variant="body">
            {pageDetails?.title}::::
            <Typography variant="subtitle">{pageDetails.info}</Typography>
          </Typography>
        }>
        <IconButton
          color="inherit"
          size="large">
          <Icon />
        </IconButton>
      </Tooltip>
    </Typography>
  </Link>
);

export default function Header() {
  const { pathname } = useLocation();
  const currentPageIndex = pageAssociations.findIndex((p) => p.path === pathname);
  const page = pageAssociations[currentPageIndex];
  const nextPage = pageAssociations[currentPageIndex + 1] ?? null;
  const previousPage = pageAssociations[currentPageIndex - 1] ?? null;

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 15 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title={page.info}>
            <IconButton color="inherit">
              <Info />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}>
            {page.title}
          </Typography>
        </Toolbar>
        <Toolbar>
          {previousPage && (
            <NavButton
              Icon={ArrowBack}
              pageDetails={previousPage}
            />
          )}
          <Typography
            sx={{
              flexGrow: 1
            }}></Typography>
          {nextPage && (
            <NavButton
              Icon={ArrowForward}
              pageDetails={nextPage}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
