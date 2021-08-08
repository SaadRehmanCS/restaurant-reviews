import app from "./server.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import api from "./data-access-object/restaurantsDAO.js";

dotenv.config();


const port = process.env.PORT || 8000;

const client = new MongoClient(process.env.REST_REVIEWS_DB);
client.connect().catch(err => {
    console.log(err.stack);
    process.exit(1);
}).then(async () => {
    await api.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
});

