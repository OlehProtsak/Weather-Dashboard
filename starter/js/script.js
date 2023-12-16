const apiKey = "e063538dbd7a64e6085495b882b71be5";

function getWeatherByCity(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  $.ajax({
    url: apiUrl,
    method: "GET",
  })
    .then(function (response) {
      console.log(response);
      displayCurrentWeather(response);
    })
    .fail(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

$("#search-form").on("submit", function (event) {
  event.preventDefault();
  getWeatherByCity("London");
});

function displayCurrentWeather(response) {
  const currentDay = $("#today");
  currentDay.empty();

  const currentWeather = response.list[0];
  const cityName = response.city.name;
  const date = dayjs.unix(currentWeather.dt).format("MMMM D, YYYY");
  const icon = currentWeather.weather[0].icon;
  const temperature = currentWeather.main.temp;
  const humidity = currentWeather.main.humidity;
  const windSpeed = currentWeather.wind.speed;

  // Generate HTML elements to visually represent data on a webpage
  const heading = $("<h2>");
  const iconEl = $("<img>");
  const temperatureParagraph = $("<p>");
  const humidityParagraph = $("<p>");
  const windParagraph = $("<p>");
  iconEl.attr("src", `https://openweathermap.org/img/wn/${icon}.png`);
  heading.text(`${cityName} (${date})`);
  heading.append(iconEl);
  temperatureParagraph.text(`Temperature: ${temperature}°C`);
  humidityParagraph.text(`Humidity: ${humidity}%`);
  windParagraph.text(`Wind Speed: ${windSpeed} m/s`);
  currentDay.addClass("border", "border-dark");

  currentDay.append(
    heading,
    temperatureParagraph,
    humidityParagraph,
    windParagraph
  );
}
