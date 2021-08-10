import ReviewsQuery from "../mongodb-query/reviews-query.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text;
            const userInfo = {
                _id: req.body.user_id,
                name: req.body.name
                
            }
            const date = new Date();

            const ReviewResponse = await ReviewsQuery.addReview(
                restaurantId,
                userInfo,
                review,
                date
            );
            res.json({
                status: "success",
                data: ReviewResponse
        });
        } catch (e) {
            res.status(500).json({status: e.message})
        }
    }
    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const text = req.body.text;
            const userId = req.body.user_id;
            const date = new Date();

            const reviewResponse = await ReviewsQuery.updateReview(
                reviewId,
                userId,
                text,
                date
            );
            var { error } = reviewResponse;
            if (error) {
                res.status(400).json({ error });
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error("unable to recieve updated review")
            }
            res.json({
                status: "success",
                data: reviewResponse
        });
        } catch (e) {
            console.log(`unable to recieve updated review ${e}`);
            res.status(500).json({ error: e.message });
        }
    }
    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id;
            const userId = req.body.user_id;
            console.log(reviewId);
            const reviewResponse = await ReviewsQuery.deleteReview(
                reviewId,
                userId
            );
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}