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
      `https://159.89.111.193/geri_connect/public/api/v1/sessionrecords?dish_uuid=${param2}`,
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
    const videoID = data.content[0];

    console.log("videoID", videoID);

    res.status(200).json({ videoID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
