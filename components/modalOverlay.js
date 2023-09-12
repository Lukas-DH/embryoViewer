import { useState } from "react";
import styles from "../styles/Patient.module.css";
import { Form, Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router";

const ModalOverlay = ({ onClose, pdata, handleModalClose }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const { patient_date_of_birth, patient_name, session_uuid } = pdata;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform the comparison logic
    if (
      inputValue ===
      patient_date_of_birth
        .match(/\[(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})\]/)
        .slice(1)
        .map((value) => value.toString().padStart(2, "0"))
        .join("")
    ) {
      setMessage("Comparison is true!"); // Success message
      router.push(`${session_uuid}`);
      onClose(false);
      // Execute the next steps of your logic here
    } else {
      setMessage("Comparison is false. Please try again."); // Error message
    }
  };

  return (
    <>
      <div
        className="modal show"
        style={{
          display: "block",
          zIndex: "9999",
          margin: "auto",
          top: "20vh",
          role: "",
        }}
      >
        <Modal.Dialog>
          <Modal.Header
            closeButton
            onClick={() => {
              onClose(false);
              router.reload();
            }}
          >
            <Modal.Title>
              {patient_date_of_birth}Patient Validation {patient_name}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form autoComplete="off" onSubmit={handleFormSubmit}>
              {patient_date_of_birth == "" ? (
                "en attente des données"
              ) : (
                <>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      Veuillez entrer votre date de naissance [AAAAMMJJ]
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="date de naissance AAAAMMJJ"
                      value={inputValue}
                      onChange={handleInputChange}
                      onClose={onClose}
                    />
                    <Form.Text className="text-muted">
                      or scan the barcode
                    </Form.Text>
                  </Form.Group>{" "}
                  <Button className="m-3" type="submit">
                    Enter
                  </Button>{" "}
                  or press enter
                </>
              )}
            </Form>{" "}
            {message && <p>{message}</p>}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default ModalOverlay;
