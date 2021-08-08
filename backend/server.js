import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.routes";

const app = express();

app.use([cors(), express.json()]);

app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => {
    return res.status(404).json({error: "not found!"});
})

export default app;