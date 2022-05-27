const { Users, Thoughts} = require("../models");

const ThoughtsController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .then(dbThoughtData => {
            // if no thought is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thoughts found with this iD!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // add a thought to user
    addThought({ params, body }, res) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true, runValidators: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // delete a thought
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }
            return Users.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No pizza found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = ThoughtsController;