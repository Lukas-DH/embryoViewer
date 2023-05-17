import Link from "next/link";
import { React, useState } from "react";
import data from "../public/patienList.json";
import styles from "../styles/Patient.module.css";

function downloadQR(msg) {
  // setPName(dishUuid);
  const svg = document.getElementById("QRCode");
  console.log(msg);
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
    downloadLink.download = `${msg}`;
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
}

export default downloadQR;
