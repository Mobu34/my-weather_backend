const express = require("express");
const formidable = require("express-formidable");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(formidable());

const coords = { lat: 43.5683328, long: 3.8273024 };

app.get("/weather/currentlocation", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${coords.lat}&lon=${coords.long}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    console.log(response.data);

    return res.status(200).json({ response: response.data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.all("*", (req, res) => {
  return res.status(404).json({ error: "Page Not Found" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server Has Started on port ${process.env.PORT || 3001}`);
});
