import https from "https";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { param1, param2 } = req.body;
  console.log(param1);
  console.log("DISHUUID", param2);
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await fetch(
      `https://10.13.45.201/geri_connect/public/api/v1/sessionrecords?session_uuid=${param2}`,
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
    //   (item) => item.available === true
    // );
    // testxxx
    const videoID = data.content[0].dish_uuid;
    console.log("videoIDxxx", videoID);
    const response2 = await fetch(
      `https://10.13.45.201/geri_connect/public/api/v1/dishrecords?dish_uuid=${videoID}`,
      {
        agent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${param1}`,
        },
      }
    );

    const dish = await response2.json();

    res.status(200).json({ dish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
