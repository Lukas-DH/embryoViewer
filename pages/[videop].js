import { useRouter } from "next/router";

import NaviBarBioG from "../components/navbar";

// import styles from "../styles/Video.module.css";

import Link from "next/link";

import styles from "../styles/Patient.module.css";
import demoPatient from "../components/demo_patient";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

import { useState } from "react";
import wlecomeCode from "../public/transfer.svg";
import dynamic from "next/dynamic";

const Post = () => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  const router = useRouter();
  const { videop } = router.query;
  const videoUrl =
    "https://159.89.111.193/files/video.json/cda75800-5b24-11ed-9d94-0800273179d6/well01_zid99.mp4";
  // const num = JSON.stringify(videop).slice(-3, -1);
  // console.log(num);

  // const item = demoPatient.content.filter(
  //   (video) => video.well_number == parseInt(num).well_number
  // );
  // console.log(parseInt(item));
  return (
    <>
      <NaviBarBioG />
      <div className={styles.container}>
        <Button
          onClick={() => {
            setCounter(counter + 1);
            console.log(counter);
          }}
        >
          +1
        </Button>
        <main className={styles.main}>
          <h1 className={styles.title}>Patient Name (patient ID-number)</h1>
          <br />
          <div className={styles.grid}>
            {demoPatient.content
              .filter(
                (video) =>
                  video.fate_status.includes("transfer") ||
                  video.fate_status.includes("freeze")
              )
              .map((video) => (
                <Card key={video.well_number} style={{ margin: "1rem" }}>
                  <ReactPlayer
                    playing={true}
                    loop={true}
                    controls={true}
                    playbackRate={2}
                    width="30vw"
                    // height={840}
                    url={`https://159.89.111.193/files/video.json/${videop}/well01_zid99.mp4`}
                  />
                  {/* <video
                    controls
                    width="700vw"
                    height="700vh"
                    loop
                    autoPlay
                    muted
                    preload="auto"
                    poster={`/Demo_well${
                      video.well_number > 9
                        ? video.well_number
                        : "0" + video.well_number
                    }_zid99_Example Patient - 2 6.0_172500.png`}
                    // cda75800-5b24-11ed-9d94-0800273179d6
                  >
                    <source
                      src={`https://159.89.111.193/files/video.json/cda75800-5b24-11ed-9d94-0800273179d6/well0${counter}_zid99.mp4`}
                      type="video/mp4"
                    />
                  </video> */}
                  <Card.Body>
                    <Card.Title>
                      Well {video.well_number + " "}
                      {video.fate_status === "transfer" ? (
                        <Image
                          src="/transfer.svg"
                          alt="Vercel Logo"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Image
                          src="/freeze.svg"
                          alt="Vercel Logo"
                          width={20}
                          height={20}
                        />
                      )}{" "}
                      -{" "}
                    </Card.Title>

                    <Card.Text>
                      This embryo will be{" "}
                      <strong>
                        {video.fate_status === "freeze"
                          ? "frozen"
                          : "transfered"}
                      </strong>
                    </Card.Text>
                    <Link
                      href={`/well${
                        video.well_number > 9
                          ? video.well_number
                          : "0" + video.well_number
                      }`}
                    >
                      <Button variant="primary">Video</Button>{" "}
                    </Link>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </main>
      </div>
    </>
  );
};
export default Post;
