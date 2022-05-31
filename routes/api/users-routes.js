const router = require("express").Router();
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    addFriend,
    deleteFriend,
    deleteUsers
} = require("../../controllers/users-controller");

// /api/users
router
    .route("/")
    .get(getAllUsers)
    .post(createUsers);

// /api/users/:id
router
    .route("/:id")
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);

// /api/users/<userId>/friends/<friendId>
router
    .route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;