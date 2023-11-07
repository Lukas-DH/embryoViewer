import { useRouter } from "next/router";

import NaviBarBioG from "../components/navbar";

// import styles from "../styles/Video.module.css";

import Link from "next/link";

import styles from "../styles/Patient.module.css";
import demoPatient from "../components/demo_patient";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

import { useState, useEffect } from "react";
import wlecomeCode from "../public/transfer.svg";
import dynamic from "next/dynamic";
import fateData from "../components/fateData";
import dishData from "../components/dishData";
const Post = () => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  const router = useRouter();
  const { videop } = router.query;

  const [fate, setFate] = useState(null);
  const [dish, setDish] = useState(null);

  useEffect(() => {
    if (videop) {
      const fetchData = async () => {
        try {
          const data = await fateData(videop);
          setFate(data.fateData);

          console.log("MYFATE", data);

          const dish = await dishData(videop); // Substitute with your actual function here
          // replacexxx
          console.log(
            "MYDISH",
            dish.dishData.dish.content[0].patient_given_names
          );
          setDish(
            dish.dishData.dish.content[0].patient_given_names
            // + " " +
            // dish.dishData.dish.content[0].patient_name
          );
        } catch (error) {
          console.log(error);
          // Handle your error
        }
      };

      fetchData();
    }
  }, [router.query]);

  useEffect(() => {
    const timeoutDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
    const timer = setTimeout(() => {
      router.push("/");
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [router]);

  console.log(fate);

  return (
    <>
      <NaviBarBioG />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>{dish}</h1>

          <br />
          <div className={styles.grid}>
            {fate
              ? fate.content
                  .filter(
                    (video) => video.fate_status.includes("transfer")
                    // ||
                    // video.fate_status.includes("freeze")
                  )
                  .slice(0, 3)
                  .map((video) => (
                    <Card key={video.well_number} style={{ margin: "1rem" }}>
                      <ReactPlayer
                        playing={true}
                        loop={true}
                        controls={true}
                        playbackRate={2}
                        muted={true}
                        volume={0}
                        // width="100% !important;"
                        // height="100% !important"
                        width="45vw"
                        height="60vh"
                        url={`https://geri.biogrouppaca.local/files/video.json/${videop}/well${
                          video.well_number < 10
                            ? "0" + video.well_number
                            : "" + video.well_number
                        }_zid99.mp4`}
                      />

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
                        ></Link>
                      </Card.Body>
                    </Card>
                  ))
              : "no data"}
          </div>
        </main>
      </div>
    </>
  );
};
export default Post;
