import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ListSearch from "../components/list";
import NaviBarBioG from "../components/navbar";
import styles from "../styles/Patient.module.css";

function List() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      {" "}
      <NaviBarBioG />
      <div className={styles.container}>
        <main className={styles.main}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={inputHandler}
                type="text"
                placeholder="Patient Name"
              />
              <Form.Text className="text-muted">or scan the barcode</Form.Text>
            </Form.Group>
          </Form>
          <ListSearch input={inputText} />
        </main>
      </div>
    </>
  );
}

export default List;
