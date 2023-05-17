import { React, useState, useEffect } from "react";

export default function ApiTest() {
  const [data, setData] = useState([]);

  async function hello(params) {
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
            param2: "value2",
          }),
        });
      })
      .then((response) => response.json())
      .then((otherData) => {
        console.log(otherData.data.content); // Process the other response data
        setData(otherData.data.content);
      })
      .catch((error) => console.log("error", error));
  }
}
