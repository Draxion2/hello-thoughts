const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Username is required!",
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
    friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
},
{
    toJSON: {
        virtuals: true
    }
})

// get total count of friends
UserSchema.virtual('friendCount').get(function() {
    return "Friends: " + this.friends.length;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;