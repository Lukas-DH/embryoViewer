import React, { useState } from "react";
import ScannerInput from "../../components/QRCodeReader";
import ModalOverlay from "../../components/modalOverlay";

function Reader() {
  const [data, setData] = useState("XXX");
  const [pdata, setPdata] = useState("pdata");
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleScanned(value) {
    console.log(`Scanned value: ${value}`);
    // setUrl(`https://159.89.111.193/files/video.json/${value}/well01_zid04.mp4`);
    hello(value);
  }

  async function hello(query) {
    fetch("api/tokenAPI")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        console.log(result.data.token);
        return Promise.all([
          fetch("api/dishRecords", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              param1: `${result.data.token}`,
              param2: `${query}`,
            }),
          }).then((response) => response.json()),
          fetch("api/sessionRecord", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              param1: `${result.data.token}`,
              param2: `${query}`,
            }),
          }).then((response) => response.json()),
        ]);
      })
      .then(([dishRecord, sessionRecord]) => {
        // Handle the response from the third API call (thirdData) and second fetch call (secondEndpointData)
        console.log("Response from the third API call:", dishRecord);
        setPdata(dishRecord.filteredData[1].patient_given_names);
        // setPdata(dishRecord.videoID.)
        setShowModal(true);
        // setUrl(
        //   `https://159.89.111.193/files/video.json/${sessionRecord.videoID.session_uuid}/well01_zid04.mp4`
        // );

        setUrl(sessionRecord.videoID.session_uuid);
        console.log(
          "Response from the second fetch call:",
          `https://159.89.111.193/files/video.json/${sessionRecord.videoID.session_uuid}/well01_zid04.mp4`
          // sessionRecord.videoID.session_uuid
        );
      })

      .catch((error) => console.log("error", error));
  }

  function onClose(status) {
    setShowModal(status);
    // Redirect to the next step
    window.location.href = `https://159.89.111.193/files/video.json/${url}/well01_zid99.mp4`;
  }

  return (
    <div>
      <ScannerInput
        // handleModalClose={handleModalClose}
        onScanned={handleScanned}
        // data={data}
        // onclick={handleModalClose}
      />
      {JSON.stringify(data)}
      <br></br>
      <br></br>
      {JSON.stringify(pdata)}
      <br></br>
      <br></br>
      {url}
      {showModal && <ModalOverlay pdata={pdata} onClose={onClose} />}
    </div>
  );
}

export default Reader;
