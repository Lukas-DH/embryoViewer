import React, { useEffect, useState } from "react";

export default function ScannerInput({ onScanned }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 13) {
        // Handle scanned value here
        const scannedValue = value.trim();
        console.log(`Scanned value: ${scannedValue}`);

        // Call onScanned callback with scanned value
        if (scannedValue) {
          onScanned(scannedValue);
        }

        // Reset input value
        setValue("");
      } else {
        // Update input value
        setValue((value) => value + event.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onScanned, value]);

  return <input type="text" value={value} />;
}
