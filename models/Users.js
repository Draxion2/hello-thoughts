const { Schema, model } = require("mongoose");
const validateEmail = require("../utils/validateEmail");
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
        validate: [
            validateEmail,
            "Please enter a valid email address"
        ],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
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
    },
    id: false
})

// get total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;