import https from "https";
import fetch from "node-fetch";
// clinic ip 10dot13dot45dot201

export default async function handler(req, res) {
  const { param1, param2 } = req.body;
  console.log(param1);
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await fetch(
      "https://159.89.111.193/geri_connect/public/api/v1/dishrecords",
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

    const uniqueDishUuids = {};
    const filteredData = data.content.filter((el) => {
      //if no input, return the original
      if (param2.length < 1) {
        return null;
      }
      //return the item which contains the user input and has a unique dish_uuid
      else {
        // change list order here testxxx
        if (uniqueDishUuids[el.dish_uuid]) {
          return false; // exclude if duplicate dish_uuid
        }
        uniqueDishUuids[el.dish_uuid] = true; // mark as seen
        return (
          el.patient_given_names.toLowerCase().includes(param2) ||
          el.patient_name.toLowerCase().includes(param2) ||
          el.patient_date_of_birth.includes(param2) ||
          el.identifier_1.includes(param2) ||
          el.dish_uuid.includes(param2) & (param2.length > 30)
        );
      }
    });

    // const filteredData = data.content.filter((el) => {
    //   //if no input the return the original
    //   if (param2.length < 1) {
    //     return null;
    //   }
    //   //return the item which contains the user input
    //   else {
    //     return (
    //       el.patient_given_names.toLowerCase().includes(param2) ||
    //       el.patient_name.toLowerCase().includes(param2) ||
    //       el.patient_date_of_birth.includes(param2) ||
    //       el.identifier_1.includes(param2) ||
    //       el.dish_uuid.includes(param2) & (param2.length > 30)
    //     );
    //   }
    // });

    // const filteredData = data.content.filter(
    //   (item) => item.patient_given_names === "johny"
    // );
    console.log("length", param2);

    res.status(200).json({ filteredData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
