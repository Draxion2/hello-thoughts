const { json } = require("express/lib/response");
const { Users } = require("../models");

const UsersController = {

    // get all Users
    getAllUsers(req, res) {
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
    addFriend( { params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            Users.findOneAndUpdate(
                { _id: params.friendId },
                { $push: { friends: params.userId } },
                { runValidators: true, new: true }
            )
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a friend
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        });
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