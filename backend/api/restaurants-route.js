//const router = require("express").Router;
import express from "express";
import RestaurantsController from "./restaurants-controller.js";

const app = express();

app.get("/", RestaurantsController.apiGetRestaurants);

export default app;