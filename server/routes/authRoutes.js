const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

const User = require("../models/User")

// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()

    res.status(201).json({
      message: "User registered successfully"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      "SECRET_KEY",
      {
        expiresIn: "1d"
      }
    )

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

module.exports = router