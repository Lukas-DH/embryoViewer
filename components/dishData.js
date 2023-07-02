export default async function dishData(query) {
  try {
    const response = await fetch("/api/tokenAPI");
    const result = await response.json();
    console.log(result.data.token);

    const dishData = await fetch("/api/dishDataVideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        param1: result.data.token,
        param2: query,
      }),
    }).then((response) => response.json());

    console.log("dishData:", dishData);
    return {
      dishData,
    };
  } catch (error) {
    console.log("error", error);
    throw error; // Rethrow the error to handle it in the caller function
  }
}
