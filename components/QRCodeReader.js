import React, { useEffect, useState } from "react";

export default function ScannerInput({ onScanned }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    // function handleKeyDown(event) {
    //   if (event.keyCode === 13) {
    //     // Handle scanned value here
    //     const scannedValue = value.trim();
    //     console.log(`Scanned value: ${scannedValue}`);

    //     // Call onScanned callback with scanned value
    //     if (scannedValue) {
    //       onScanned(scannedValue);
    //     }

    //     // Reset input value
    //     setValue("");
    //   } else {
    //     // Update input value
    //     setValue((value) => value + event.key);
    //   }
    // }

    function handleKeyDown(event) {
      // Simulate the key press using the 'en-US' locale to get the character as it would appear on a US keyboard.
      let char = new KeyboardEvent("keydown", {
        key: event.key,
        locale: "en-US",
      }).key;

      if (event.keyCode === 13) {
        const scannedValue = value.trim();
        console.log(`Scanned value: ${scannedValue}`);
        if (scannedValue) {
          onScanned(scannedValue);
        }
        setValue("");
      } else {
        setValue((value) => value + char);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onScanned, value]);

  return <input type="hidden" value={value} />;
}
