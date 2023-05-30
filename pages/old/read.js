import ScannerInput from "../../components/QRCodeReader";
import React, { useState, useRef, useEffect } from "react";

function Reader() {
  const [data, setData] = useState();
  const [url, setUrl] = useState("");
  function handleScanned(value) {
    console.log(`Scanned value: ${value}`);
    // window.location = value;
    // Handle scanned value here
    // location.assign(`${value}`);
    // location = "https:" + value;
    setUrl(`https://159.89.111.193/files/video.json/${value}/well01_zid04.mp4`);

    hello(value);
  }

  async function hello(query) {
    fetch("api/tokenAPI")
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.token);
        return fetch("api/sessionRecord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            param1: `${result.data.token}`,
            param2: `${"10000000-0000-0000-0000-000000000000"}`,
          }),
        });
      })
      .then((response) => response.json())
      .then((otherData) => {
        window.location = `https://159.89.111.193/files/video.json/${otherData.videoID}/well01_zid99.mp4`; // Process the other response data
        setData(otherData);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <ScannerInput onScanned={handleScanned} />
      {JSON.stringify(data)}
      <br></br>
      <br></br>
      {url}
    </div>
  );
}

export default Reader;
