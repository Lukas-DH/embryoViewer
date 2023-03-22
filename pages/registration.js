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

  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    console.log(svg);
    // const svgData = new XMLSerializer().serializeToString(svg);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  return (
    <>
      <NaviBarBioG />
      <QRCode id="QRCode" value={value} />
      <input type="button" value="Download QR" onClick={onImageCownload} />
      <input type="text" value={value} onChange={onValueChange} />
      <div>{value}</div>
    </>
  );
}

// ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));
