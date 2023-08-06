const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    habits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habit'
        }
    ],
})

userSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //the passwordHash should no tbe revealed
        delete returnedObject.passwordHash
    }
})
const User = mongoose.model('User',userSchema);
module.exports = User;