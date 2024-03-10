const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const Post = require("../models/Post");

// Include other resource routers
const commentRouter = require("./comments");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:postId/comments", commentRouter);

router
  .route("/")
  .get(advancedResults(Post, "comments"), getPosts)
  .post(protect, authorize("publisher", "admin"), createPost);

router
  .route("/:id")
  .get(getPost)
  .put(protect, authorize("publisher", "admin"), updatePost)
  .delete(protect, authorize("publisher", "admin"), deletePost);

module.exports = router;
