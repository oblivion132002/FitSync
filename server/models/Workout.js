const mongoose = require("mongoose")

const workoutSchema = new mongoose.Schema({

  exercise: {
    type: String,
    required: true,
  },

  calories: {
    type: Number,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

}, {
  timestamps: true,
})

module.exports = mongoose.model("Workout", workoutSchema)