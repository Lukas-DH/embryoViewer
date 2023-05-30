import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NaviBarBioG from "../components/navbar";
import Link from "next/link";

import wlecomeCode from "../public/qrcode_he.png";
import Reader from "../components/readerComp";
import { Button } from "react-bootstrap";
// import bioBrand from "../public/logo_mobile-retina.png";

import hello from "../components/patientVideo";

export default function Home() {
  function handleClick() {
    hello("0fdf564f-f643-11ed-9e38-408d5cb3f703");
  }

  return (
    <>
      {" "}
      <NaviBarBioG />
      <div className={styles.container}>
        <Button onClick={handleClick}>TESTING API</Button>
      </div>
    </>
  );
}
