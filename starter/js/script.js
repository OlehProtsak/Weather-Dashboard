const apiKey = "e063538dbd7a64e6085495b882b71be5";

function getWeatherByCity(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  $.ajax({
    url: apiUrl,
    method: "GET",
  })
    .then(function (response) {
      console.log(response);
    })
    .fail(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  getWeatherByCity("London");
});
