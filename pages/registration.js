import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import NaviBarBioG from "../components/navbar";
import { useState } from "react";

export default function Scanner() {
  const [value, setValue] = useState("hello");

  const onValueChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <NaviBarBioG />
      <QRCode value={value} />
      <input type="text" value={value} onChange={onValueChange} />
      <div>{value}</div>
    </>
  );
}

// ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));
