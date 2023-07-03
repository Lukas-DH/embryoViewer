import React, { useState } from "react";
import ScannerInput from "../components/QRCodeReader";
import ModalOverlay from "../components/modalOverlay";
import hello from "../components/patientVideo";

import styles from "../styles/Patient.module.css";

function Reader() {
  const [pdata, setPdata] = useState({
    patient_date_of_birth: "",
    patient_given_names: "",
    patient_name: "",
    session_uuid: "",
  });
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function handleScanned(value) {
    console.log(`Scanned value: ${value}`);
    setShowModal(true);

    try {
      const result = await hello(value);

      // Access the returned values from the hello function
      const { dishRecord, sessionRecord } = result;
      // Do something with dishRecord and sessionRecord
      console.log("BRRRRRRAAAA", dishRecord);
      // Redirect to the next step
      setUrl(sessionRecord.videoID.session_uuid);
      //change list order here testxxx
      setPdata({
        patient_date_of_birth: dishRecord.filteredData[0].patient_date_of_birth,
        patient_given_names: dishRecord.filteredData[0].patient_given_names,
        patient_name: dishRecord.filteredData[0].patient_name,
        session_uuid: sessionRecord.videoID.session_uuid,
      });
      console.log("yippyyyyy", pdata);
      // window.location.href = `https://159.89.111.193/files/video.json/${sessionRecord.videoID.session_uuid}/well01_zid99.mp4`;
    } catch (error) {
      // Handle any errors that occurred during the fetch calls
      console.log(error);
    }
  }

  function onClose(status) {
    console.log(pdata);
    setShowModal(status);
    // Redirect to the next step
    // window.location.href = `https://159.89.111.193/files/video.json/${url}/well01_zid99.mp4`;
    // window.location.href = `https://159.89.111.193/files/video.json/${url}`
    // router.push(`${url}`);
  }

  return (
    <div>
      <ScannerInput onScanned={handleScanned} />

      {showModal && (
        <ModalOverlay
          className={styles.overlay}
          pdata={pdata}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default Reader;
