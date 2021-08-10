import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsQuery {
    static async injectDB(client) {
        if (reviews) {
            return
        }
        try {
            reviews = await client.db(process.env.REST_REVIEWS_NS).collection("reviews");
        } catch (e) {
            console.log(`Unable to establish connection ${e}`);
        }
    }
    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId)
            };
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.log(`Unable to add review ${e}`);
            return { error: e };
        }
    }
    static async updateReview(reviewId, userId, text, date) {
        try {
            const docToUpdate = {
                user_id: userId,
                _id: ObjectId(reviewId)
            };
            const newUpdates = {
                $set: { text: text, date: date }
            }
            const queryUpdate = await reviews.updateOne(docToUpdate, newUpdates);
            return queryUpdate;
        } catch (e) {
            console.log(`Unable to update review in the db ${e}`);
            return { error: `unable to update ${e}` }
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId
            });
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete ${e}`);
            return { error: e };
        }
    }
}