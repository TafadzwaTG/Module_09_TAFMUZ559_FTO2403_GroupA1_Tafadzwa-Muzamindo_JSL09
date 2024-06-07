document.addEventListener("DOMContentLoaded", () => {

  // Function to display a random image from Unsplash
 function displayRandomImage() {
    fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=landscape"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
         // Set background image and author information
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        document.getElementById("author").textContent = `By: ${data.user.name}`;
      })
      .catch((error) => {
         // If there's an error fetching the image, display a default one
        console.error("Error fetching image:", error);
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
        document.getElementById("author").textContent = "By: Dodi Achmad";
      });
  }
 // Function to display Dogecoin data
  function displayDogecoinData() {
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong fectching Dogecoin data");
        }
        return response.json();
      })
      .then((data) => {
         // Extract relevant data and display it
        const currentPrice = (
          data.market_data.current_price.usd * 10.20
        ).toFixed(2);
        const highPrice = (data.market_data.high_24h.usd * 10.20).toFixed(2);
        const lowPrice = (data.market_data.low_24h.usd * 10.20).toFixed(2);

            // Update HTML elements with Dogecoin data
        document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>`;

        document.getElementById("crypto").innerHTML = `
    <p>🎯: R${currentPrice}</p>
    <p>👆🏽 : R${highPrice}</p>
    <p>👇🏼 : R${lowPrice}</p> `;
      })
      .catch((error) => {
        console.error("Error fetching Dogecoin data", error);
      });
  }
    // Function to get current time and update the DOM every second
  function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    document.getElementById(
      "time"
    ).textContent = `${hours} :${minutes} :${seconds}`;
  }
  setInterval(getCurrentTime, 1000);

  // Function to display weather data
  function displayWeather() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(
          `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Weather data not available");
            }
            return response.json();
          })
          .then((data) => {
              // Extract relevant weather data and update the DOM
            console.log(data);
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
              <img src=${iconUrl} />
              <p class="weather-temp">${Math.round(data.main.temp)}°C</p>
              <p class="weather-city">${data.name}</p>
            `;
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }
    // Call the functions to display content on page load
  displayRandomImage();
  displayDogecoinData();
  displayWeather();
});
