const express = require("express")
const router = express.Router()

const Workout = require("../models/Workout")

// GET all workouts
router.get("/", async (req, res) => {

  try {

    const workouts = await Workout.find()

    res.json(workouts)

  } catch (err) {

    res.status(500).json({
      message: err.message,
    })
  }
})

// ADD workout
router.post("/", async (req, res) => {

  try {

    const newWorkout = new Workout({
      exercise: req.body.exercise,
      calories: req.body.calories,
      duration: req.body.duration,
    })

    const savedWorkout = await newWorkout.save()

    res.status(201).json(savedWorkout)

  } catch (err) {

    res.status(500).json({
      message: err.message,
    })
  }
})

// DELETE workout
router.delete("/:id", async (req, res) => {

  try {

    await Workout.findByIdAndDelete(req.params.id)

    res.json({
      message: "Workout deleted",
    })

  } catch (err) {

    res.status(500).json({
      message: err.message,
    })
  }
})

module.exports = router