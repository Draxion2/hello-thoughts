const { Users } = require("../models");

const UsersController = {

    // get all Users
    getAllUserss(req, res) {
        Users.find({})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .populate({
            path: "friends",
            select: "-__v"
        })
        .select("-__v")
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one User by id
    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .populate({
            path: "friends",
            select: "-__v"
        })
        .select("-__v")
        .then(dbUsersData => {
            // if no User is found, send 404
            if (!dbUsersData) {
                res.status(404).json({ message: "No Users found with this iD!" });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create a new User
    createUsers({ body }, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    // update User by id
    updateUsers({ params, body}, res) {
        Users.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({ message: "No Users found with this id!" });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add a friend
    addFriend({ params }, res) {
        Users.findOne({ _id: params.userId })
        .then(updatedUser => Users.updateOne(
            { _id: updatedUser.id},
            { $push: { friends: params.friendId }},
            { new: true }
        ))
        .then(() => Users.findOne({ _id: params.friendId }))
        .then(friend => Users.updateOne(
            {_id: friend.id },
            { $push: { friends: params.userId }},
            { new: true }
        ))
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // remove a friend
    removeFriend({ params }, res) {
        Users.findOne({ _id: params.userId })
        .then(updatedUser => Users.updateOne(
            { _id: updatedUser.id},
            { $pull: { friends: params.friendId }},
            { new: true }
        ))
        .then(() => Users.findOne({ _id: params.friendId }))
        .then(friend => Users.updateOne(
            {_id: friend.id },
            { $pull: { friends: params.userId }},
            { new: true }
        ))
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete a User
    deleteUsers({ params }, res) {
        Users.findByIdAndDelete({ _id: params.id })
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({ message: "No Users found with this id!" });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = UsersController;