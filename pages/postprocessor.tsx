import { useEffect, useState } from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

import supportLeftIcon from "../public/supportLeft.png";
import supportRightIcon from "../public/supportRight.png";
import arrowLeft from "../public/arrowLeft.png";
import arrowRight from "../public/arrowRight.png";
import arrowLongRight from "../public/arrowLongRight.png";
import arrowLongLeft from "../public/arrowLongLeft.png";
import AddNewRod from "../components/AddNewRod";
import { Rod } from "../types";

const Postprocessor = () => {
  return (
    <>
      <Head>
        <title>Постпроцессор</title>
        <meta name="description" content="postprocessor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="d-flex align-items-center bg-secondary">
        <Typography
          variant="h1"
          className="fs-1 fw-bold p-3 bg-secondary text-bg-info"
        >
          <Link href="/">Turbo-Sapr</Link>
        </Typography>
        <Typography variant="h2" className="ms-5 fs-3 text-info">
          Постпроцессор
        </Typography>
      </header>
    </>
  );
};

export default Postprocessor;
