const API_KEY = "598304f7cd807fa6e73ad363d6b41d3d";

export const getWeather = async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=Khon Kaen&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    console.log("WEATHER DATA:", data); // debug

    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};