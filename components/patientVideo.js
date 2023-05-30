export default async function hello(query) {
  try {
    const response = await fetch("api/tokenAPI");
    const result = await response.json();
    console.log(result.data.token);

    const [dishRecord, sessionRecord] = await Promise.all([
      fetch("api/dishRecords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          param1: result.data.token,
          param2: query,
        }),
      }).then((response) => response.json()),
      fetch("api/sessionRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          param1: result.data.token,
          param2: query,
        }),
      }).then((response) => response.json()),
    ]);
    console.log("dishRecord:", sessionRecord);
    return {
      dishRecord,
      sessionRecord,
    };
  } catch (error) {
    console.log("error", error);
    throw error; // Rethrow the error to handle it in the caller function
  }
}
