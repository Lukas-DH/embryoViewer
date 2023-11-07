import { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import QRCode from "react-qr-code";
import ListSearch from "../components/listManul";
import NaviBarBioG from "../components/navbar";
import styles from "../styles/Patient.module.css";
import ApiTest from "../components/dishList";
import downloadQR from "../components/downloadQR";
import hello from "../components/patientVideo";

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
    hello1(fData);
    // event.target.reset();
  };

  async function hello1(query) {
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

  async function trigger(value) {
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
      // window.location.href = `https://10.13.45.201/files/video.json/${sessionRecord.videoID.session_uuid}/well01_zid99.mp4`;
    } catch (error) {
      // Handle any errors that occurred during the fetch calls
      console.log(error);
    }
  }

  // downloadQR(msg);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      {" "}
      <NaviBarBioG />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Manual Patient Search</h1>
          <br></br>{" "}
          {/* <QRCode className={styles.QRCode} id="QRCode" value={pUuuid} /> */}
          <div className={styles.container}> </div>
          <Form autoComplete="off" onSubmit={handleSumbit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontSize: "25px" }}>Name search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Patient Name"
                name="patientName"
                ref={inputRef}
              />
              {/* <Form.Text className="text-muted">or scan the barcode</Form.Text> */}
            </Form.Group>
            <Button style={{ fontSize: "20px" }} type="submit">
              Search
            </Button>
          </Form>
          {/* <Button onClick={() => onImageCownload("scheisse")} /> */}
          <ListSearch
            data={data}
            // input={data}
            qUuid={setPuuid}
          />
        </main>
      </div>
    </>
  );
}

export default List1;
