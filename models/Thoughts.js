const { Schema, model, Types } = require("mongoose");
const formatDate = require("../utils/formatDate");
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (data) => formatDate(data)
    }
},
{
    toJSON: {
        getters: true
    }
})
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Content is required!",
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (data) => formatDate(data)
    },
    username: {
        type: String,
        required: "Username is required!"
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// get toal count of reactions
ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;