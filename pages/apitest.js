import { useRef } from "react";
import { React, useState, useEffect } from "react";

export default function ApiTest() {
  const [data, setData] = useState(null);

  async function hello(params) {
    fetch("api/tokenAPI")
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      identifier: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    // console.log(JSON.stringify(body));

    try {
      mutateUser(
        await fetchJson("/api/hello", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  }

  return (
    <div>
      <button onClick={hello}>API</button>
    </div>
  );
}
