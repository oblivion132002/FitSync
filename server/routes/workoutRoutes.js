const express = require("express")

const router = express.Router()

const Workout = require("../models/Workout")

// CREATE WORKOUT
router.post("/", async (req, res) => {

  try {

    const workout = new Workout(req.body)

    await workout.save()

    res.status(201).json(workout)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

// GET USER WORKOUTS
router.get("/:userId", async (req, res) => {

  try {

    const workouts = await Workout.find({
      userId: req.params.userId
    })

    res.status(200).json(workouts)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

// DELETE WORKOUT
router.delete("/:id", async (req, res) => {

  try {

    await Workout.findByIdAndDelete(
      req.params.id
    )

    res.status(200).json({
      message: "Workout deleted"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

module.exports = router