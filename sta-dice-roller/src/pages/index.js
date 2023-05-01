import Head from "next/head";
import { Fragment } from "react";
import {Typography} from "@mui/material";
import DataArea from "@/components/DataArea";

import { Box, CssBaseline } from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function Home() {
  return (
    <Fragment>
      <CssBaseline />
      <Box sx={{width: "98%", margin: "auto"}}>
      <Head>
        <title>STA Probability Distribution</title>
        <meta name="description" content="Visualize Star Trek Adventures dice pools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Typography variant="h1" gutterBottom>Star Trek Adventures</Typography>
        <Typography variant="h2" gutterBottom>Dice pool probability distribuitons</Typography>
        <DataArea />
      </main>
      </Box>
    </Fragment>
  );
}
