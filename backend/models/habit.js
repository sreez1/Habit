const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    habit: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required: false,
        minlength:3,
    },
    startDate: {
        type: Date,
        required: true,
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
})

habitSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
      delete returnedObject.__v
    }
  })

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;