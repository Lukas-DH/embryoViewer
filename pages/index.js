import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TextLinkExample from "../components/navbar";

import wlecomeCode from "../public/qrcode_he.png";
// import bioBrand from "../public/logo_mobile-retina.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <TextLinkExample />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">EmbryoView!</a>
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
          <a href="" className={styles.card}>
            <h2>Create a barcode &rarr;</h2>
            <p>
              Can be scanned using a smart phone or tablet to show the patient
              embryos.
            </p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Search &rarr;</h2>
            <p>Search a name pr scan a barcode to load up a patient profile.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
