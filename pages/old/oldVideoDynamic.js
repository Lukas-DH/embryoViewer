import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import NaviBarBioG from "../../components/navbar";
import Link from "next/link";
import demoPatient from "../../components/demo_patient";
import styles from "../styles/Video.module.css";
import Image from "next/image";
import ReactPlayer from "react-player";

const Post = () => {
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
      {" "}
      <NaviBarBioG />{" "}
      <Container>
        <main className={styles.main}>
          <h1 className={styles.title}>Patient Name (patient ID-number)</h1>{" "}
          <br />
          <h1 className={styles.title2}>{videop}</h1>
          <Image
            src={`/${
              demoPatient.content.filter(
                (item) => item?.well_number === parseInt(videop?.substr(-2))
              )[0]?.fate_status
            }.svg`}
            alt="Vercel Logo"
            width={72}
            height={50}
          />{" "}
          <br />
          {/* <div>
            <ReactPlayer url={videoUrl} controls={true} />
          </div> */}
          <video
            controls
            width="100%"
            height="500vh"
            loop
            muted
            preload="auto"
            poster={`/Demo_${videop}_zid99_Example Patient - 2 6.0_172500.png`}
          >
            <source
              src={`https://159.89.111.193/files/video.json/cda75800-5b24-11ed-9d94-0800273179d6/well01_zid99.mp4`}
              type="video/mp4"
            />
            <source src="rabbit320.webm" type="video/webm" />
          </video>
        </main>
      </Container>
      <footer className={styles.footer}>
        <a
          href="https://CaringIVF.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by CaringIVF{" "}
        </a>
        {videop?.length > 3
          ? demoPatient.content.filter(
              (item) => item?.well_number === parseInt(videop?.substr(-2))
            )[0]?.fate_status
          : null}
      </footer>
    </>
  );
};

export default Post;
