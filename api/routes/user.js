const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const User = require('../../model/user')

/**
 * SIGNUP USER
 * POST /api/user/signup
 */
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    // validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        msg: 'All fields are required'
      })
    }

    // check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({
        msg: 'Email already exists'
      })
    }

    // create user
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password
    })

    await user.save()

    res.status(201).json({
      msg: 'User created successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
})

module.exports = router
 