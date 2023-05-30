import React, { useState } from "react";
import ScannerInput from "../components/QRCodeReader";
import ModalOverlay from "../components/modalOverlay";
import hello from "../components/patientVideo";
import { useRouter } from "next/router";

function Reader() {
  const router = useRouter();
  const [data, setData] = useState("XXX");
  const [pdata, setPdata] = useState({
    patient_date_of_birth: "",
    patient_given_names: "",
    patient_name: "",
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
      console.log("BRRRRRRAAAA", sessionRecord);
      // Redirect to the next step
      setUrl(sessionRecord.videoID.session_uuid);
      setPdata({
        patient_date_of_birth: dishRecord.filteredData[1].patient_date_of_birth,
        patient_given_names: dishRecord.filteredData[1].patient_given_names,
        patient_name: dishRecord.filteredData[1].patient_name,
      });
      console.log("yippyyyyy", pdata);
      // window.location.href = `https://159.89.111.193/files/video.json/${sessionRecord.videoID.session_uuid}/well01_zid99.mp4`;
    } catch (error) {
      // Handle any errors that occurred during the fetch calls
      console.log(error);
    }
  }

  function onClose(status) {
    setShowModal(status);
    // Redirect to the next step
    // window.location.href = `https://159.89.111.193/files/video.json/${url}/well01_zid99.mp4`;
    // window.location.href = `https://159.89.111.193/files/video.json/${url}`
    router.push(`${url}`);
  }

  return (
    <div>
      <ScannerInput
        // handleModalClose={handleModalClose}
        onScanned={handleScanned}
        // data={data}
        // onclick={handleModalClose}
      />
      {/* {JSON.stringify(data)} */}
      <br></br>
      <br></br>
      {JSON.stringify(pdata)}
      <br></br>
      <br></br>
      {"url"}
      {JSON.stringify(data)}
      {showModal && <ModalOverlay pdata={pdata} onClose={onClose} />}
    </div>
  );
}

export default Reader;
