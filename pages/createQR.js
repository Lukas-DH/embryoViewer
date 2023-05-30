import { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import QRCode from "react-qr-code";
import ListSearch from "../components/list";
import NaviBarBioG from "../components/navbar";
import styles from "../styles/Patient.module.css";
import ApiTest from "../components/dishList";
import downloadQR from "../components/downloadQR";

function List1() {
  const [counter, setCounter] = useState(1);
  const [pName, setPname] = useState("null");
  const [pUuuid, setPuuid] = useState("null");
  const [data, setData] = useState([]);
  const inputRef = useRef(null);

  const handleSumbit = (event) => {
    event.preventDefault();
    const fData = event.target.patientName.value;

    console.log(fData);
    hello(fData);
    // event.target.reset();
  };

  async function hello(query) {
    fetch("api/tokenAPI")
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.token);
        return fetch("api/dishRecords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            param1: `${result.data.token}`,
            param2: `${query}`,
          }),
        });
      })
      .then((response) => response.json())
      .then((otherData) => {
        console.log(otherData.filteredData); // Process the other response data
        setData(otherData.filteredData);
      })
      .catch((error) => console.log("error", error));
  }

  function trigger(msg, dish_uuid) {
    console.log(msg);
    console.log(dish_uuid);
    setTimeout(onImageDownload, 200, msg);

    // setPname(msg);
    // setPuuid(dish_uuid);
  }

  // downloadQR(msg);

  const onImageDownload = (msg) => {
    const svg = document.getElementById("QRCode");
    console.log("pName", pName);
    console.log("msg", msg);
    // const svgData = new XMLSerializer().serializeToString(svg);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 20;
      canvas.height = img.height + 20;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 10, 10);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${msg}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      {" "}
      <NaviBarBioG />
      <div className={styles.container}>
        <main className={styles.main}>
          <QRCode className={styles.QRCode} id="QRCode" value={pUuuid} />
          <div className={styles.container}> </div>

          <Form onSubmit={handleSumbit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Patient Name"
                name="patientName"
                ref={inputRef}
              />
              <Form.Text className="text-muted">or scan the barcode</Form.Text>
            </Form.Group>
            <Button type="submit">Search</Button>
          </Form>
          {/* <Button onClick={() => onImageCownload("scheisse")} /> */}
          <ListSearch
            data={data}
            // input={data}
            qRValue={trigger}
            qUuid={setPuuid}
          />
        </main>
      </div>
    </>
  );
}

export default List1;
