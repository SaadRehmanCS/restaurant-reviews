import app from "./server.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import restaurantApi from "./mongodb-query/restaurants-query.js";
import reviewApi from "./mongodb-query/reviews-query.js";
dotenv.config();


const port = process.env.PORT || 8000;

const client = new MongoClient(process.env.REST_REVIEWS_DB);
client.connect().catch(err => {
    console.log(err.stack);
    process.exit(1);
}).then(async () => {
    await restaurantApi.injectDB(client);
    await reviewApi.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
});

