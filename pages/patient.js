import Link from "next/link";
import NaviBarBioG from "../components/navbar";
import styles from "../styles/Patient.module.css";
import demoPatient from "../components/demo_patient";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

import wlecomeCode from "../public/transfer.svg";

function Createbarcode() {
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
        </main>
      </Container>
    </>
  );
}
export default Createbarcode;
