import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NaviBarBioG from "../components/navbar";
import Link from "next/link";

import wlecomeCode from "../public/qrcode_he.png";
import Reader from "../components/readerComp";
// import bioBrand from "../public/logo_mobile-retina.png";

export default function Home() {
  return (
    <>
      {" "}
      <NaviBarBioG /> <Reader />;
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Bienvenue à <a href="">EmbryoView!</a>
          </h1>{" "}
          <p className={styles.description}>
            Commencez en scannant votre code-barres
            <br></br>
            <br></br>
            <Image
              src={wlecomeCode}
              alt="you"
              style={{ width: "320px", height: "320px" }}
              // className="d-inline-block align-top"
            />{" "}
          </p>
          {/* <div className={styles.grid}>
            <Link
              // https://rosskhanas.github.io/react-qr-code/
              href="/createQR"
              className={styles.card}
            >
              <h2>Create QR &rarr;</h2>
              <p>
                Create a QR code for a patient to use later during consultation
              </p>
            </Link>
            <Link href="/videotest" className={styles.card}>
              <h2>Scan QR&rarr;</h2>
              <p>Scan patient QR code during embryo transfer consultation</p>
            </Link>
          </div> */}
        </main>

        <footer className={styles.footer}>
          <a
            href="https://www.CaringIVF.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by CaringIVF{" "}
          </a>
        </footer>
      </div>
    </>
  );
}
