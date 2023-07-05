import https from "https";
import fetch from "node-fetch";

export default async function handler(req, res) {
  console.log("hello");
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await fetch(
      "https://159.89.111.193/geri_connect/auth/v1/token",
      // "https://159.89.111.193/geri_connect/auth/v1/token",
      {
        agent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YXBpdXNlcjptZWRpZmlyc3Q3NTAwMQ==",
        },
      }
    );

    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
