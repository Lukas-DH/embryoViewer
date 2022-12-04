import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import NaviBarBioG from "../components/navbar";
import Link from "next/link";
import demoPatient from "../components/demo_patient";
import styles from "../styles/Video.module.css";

const Post = () => {
  const router = useRouter();
  const { videop } = router.query;

  return (
    <>
      <NaviBarBioG />

      <Container>
        {" "}
        <main className={styles.main}>
          <h1 className={styles.title}>{videop}</h1>
          <video
            controls
            width="40%"
            height="100%"
            loop
            muted
            preload="auto"
            poster={`/Demo_${videop}_zid99_Example Patient - 2 6.0_172500.png`}
          >
            <source
              src={`https://159.89.111.193/files/video.json/cda75800-5b24-11ed-9d94-0800273179d6/${videop}_zid99.mp4`}
              type="video/mp4"
            />
            {/* <source src="rabbit320.webm" type="video/webm" /> */}
            <p>
              Your browser doesn't support HTML5 video. Here is a{" "}
              <a href="rabbit320.mp4">link to the video</a> instead.
            </p>
          </video>
        </main>
      </Container>
    </>
  );
};

export default Post;
