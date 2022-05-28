const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    addReaction,
    deleteReaction,
    deleteThought
} = require("../../controllers/thoughts-controller");

// /api/thoughts
router
    .route("/")
    .get(getAllThoughts);

// api/thoughts/<userId>
router
    .route("/:userId")
    .post(addThought);

// api/thoughts/<thoughtId>/reactions
router
    .route("/thoughtId/reactions")
    .post(addReaction);

// api/thoughts/<thoughtId>
router
    .route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// api/thoughts/<thoughtId>/reactions/<reactionId>
router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;
