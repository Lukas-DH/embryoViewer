import https from "https";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { param1, param2 } = req.body;
  console.log(param1);
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await fetch(
      `https://159.89.111.193/geri_connect/public/api/v1/sessionrecords?session_uuid=${param2}&well_number=1&zid=99&session_seconds=1000`,
      {
        agent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${param1}`,
        },
      }
    );

    const data = await response.json();
    // console.log(data.content);

    // const filteredData = data.content.filter(
    //   (item) => item.patient_given_names === "johny"
    // );
    console.log(data);

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
