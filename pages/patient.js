import Link from "next/link";
import NaviBarBioG from "../components/navbar";
import styles from "../styles/Patient.module.css";
import demoPatient from "../components/demo_patient";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

import wlecomeCode from "../public/transfer.svg";

function Createbarcode() {
  demoPatient.content
    .filter(
      (video) =>
        video.fate_status.includes("transfer") ||
        video.fate_status.includes("freeze")
    )
    .map((video) => console.log(JSON.stringify(video.well_number + "tits")));

  console.log(
    JSON.stringify(
      demoPatient.content.filter(
        (video) =>
          video.fate_status.includes("transfer") ||
          video.fate_status.includes("freeze")
      ).length
    )
  );

  return (
    <>
      <NaviBarBioG />

      <Container>
        <main className={styles.wrapper}>
          {demoPatient.content
            .filter(
              (video) =>
                video.fate_status.includes("transfer") ||
                video.fate_status.includes("freeze")
            )
            .map((video) => (
              <Card key={video.well_number} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`/Demo_well${
                    video.well_number > 9
                      ? video.well_number
                      : "0" + video.well_number
                  }_zid99_Example Patient - 2 6.0_172500.png`}
                ></Card.Img>
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
                      {video.fate_status === "freeze" ? "frozen" : "transfered"}
                    </strong>
                  </Card.Text>
                  <Link
                    href={`https://159.89.111.193/files/video.json/cda75800-5b24-11ed-9d94-0800273179d6/well${
                      video.well_number > 9
                        ? video.well_number
                        : "0" + video.well_number
                    }_zid99.mp4`}
                  >
                    <Button variant="primary">Video</Button>{" "}
                  </Link>
                </Card.Body>
              </Card>
            ))}
        </main>
      </Container>

      <Link href={`/`}>
        <h1>yeah baby</h1>
      </Link>
    </>
  );
}
export default Createbarcode;

// <video
// controls
// width="400"
// height="400"
// loop
// muted
// preload="auto"
// poster="/Demo_well01_zid99_Example Patient - 2 6.0_172500.png"
// >
// <source
//   src="https://159.89.111.193/files/video.json/cda75800-5b24-11ed-9d94-0800273179d6/well01_zid99.mp4"
//   type="video/mp4"
// />
// {/* <source src="rabbit320.webm" type="video/webm" /> */}
// <p>
//   Your browser doesn't support HTML5 video. Here is a{" "}
//   <a href="rabbit320.mp4">link to the video</a> instead.
// </p>
// </video>
