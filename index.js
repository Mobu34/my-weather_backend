const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

app.get("/weather/currentposition", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get("/weather/searchcity", async (req, res) => {
  try {
    const { city } = req.query;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    return res.status(200).json(response.data);
  } catch (err) {
    if (err.name === "Error") {
      return res.status(404).json({ error: "City not found" });
    } else {
      return res.status(400).json({ error: err });
    }
  }
});

app.post("/weather/favorites", async (req, res) => {
  try {
    const { favorites } = req.fields;
    const splittedFavorites = favorites.join(",");

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/group?units=metric&id=${splittedFavorites}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

app.post("/weather/details", async (req, res) => {
  try {
    const { lat, lon } = req.fields;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&lang=fr&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(200).json({ error: err });
  }
});

app.all("*", (req, res) => {
  return res.status(404).json({ error: "Page Not Found" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server Has Started on port ${process.env.PORT || 3001}`);
});
