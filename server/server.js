const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const workoutRoutes = require("./routes/workoutRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/workouts", workoutRoutes)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected")
})
.catch((err) => {
  console.log(err)
})

// Test Route
app.get("/", (req, res) => {
  res.send("FitSync API Running")
})

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})