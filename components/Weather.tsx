export default async function Weather() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  //useState
  // useEffect

  const weatherResponse = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=38.7167&longitude=-9.1333&current=temperature_2m"
  );
  const weatherData = await weatherResponse.json();

  if (!weatherData) {
    return <p>No Data!</p>;
  }

  return (
    <div>
      <h2>Current Weather:</h2>
      <p>{weatherData.current.temperature_2m}ºC</p>
    </div>
  );
}
