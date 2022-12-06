import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NaviBarBioG from "../components/navbar";
import Link from "next/link";

import wlecomeCode from "../public/qrcode_he.png";
// import bioBrand from "../public/logo_mobile-retina.png";

export default function Home() {
  return (
    <>
      {" "}
      <NaviBarBioG />{" "}
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="">EmbryoView!</a>
          </h1>{" "}
          <p className={styles.description}>
            Get started by creating{" "}
            <code className={styles.code}>a patient barcode</code>
            <Image
              src={wlecomeCode}
              alt="you"
              style={{ width: "60px", height: "60px" }}
              // className="d-inline-block align-top"
            />{" "}
          </p>
          <div className={styles.grid}>
            <Link
              href="https://rosskhanas.github.io/react-qr-code/"
              className={styles.card}
            >
              <h2>Create a barcode &rarr;</h2>
              <p>
                Scan using a smart phone or tablet to show the patient embryos.
              </p>
            </Link>
            <Link href="/search" className={styles.card}>
              <h2>Search patient&rarr;</h2>
              <p>
                load a patient profile to see thier embryos developing in
                real-time.
              </p>
            </Link>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://CaringIVF.com"
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
