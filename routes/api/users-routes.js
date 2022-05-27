const router = require("express").Router();
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    addFriend,
    deleteFriend,
    deleteUsers
} = require("../../controllers/user-controller");

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

// /api/users/:userid/friends/:friendid
router
    .route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;