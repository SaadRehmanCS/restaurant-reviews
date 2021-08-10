import express from "express";
import RestaurantsController from "./restaurants-controller.js";
import ReviewsController from "./reviews-controller.js";

const app = express();

app.get("/", RestaurantsController.apiGetRestaurants);
app.get("/id/:id", RestaurantsController.apiGetRestaurantById);
app.get("/cuisines", RestaurantsController.apiGetRestaurantCuisines);

app.post("/review", ReviewsController.apiPostReview);
app.put("/review", ReviewsController.apiUpdateReview);
app.delete("/review", ReviewsController.apiDeleteReview);


export default app;