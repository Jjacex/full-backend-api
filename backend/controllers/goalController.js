const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// @desc gets goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    //because req.user is specified in the authMiddleware, the user is now avaiable in the request object
    //we can then look up the user by the id
    const goals = await Goal.find({user: req.user.id}) //find all the goals which belong to a specific id
    res.status(200).json(goals)
})

// @desc creates a goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        //the model for this collection requires a user
        //the user is claimed from the authMiddleware ran directly before this controller function
        //we now grab that user from the request obbject and we use the user id to set the user for the goal
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc updates a goals
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //grabbing our user from the request object.
    //the user is here because our auth middleware pulled it in directly before thie function call
    const user = await User.findById(req.user.id)

    //checking for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})

// @desc deletes a goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //grabbing our user from the request object.
    //the user is here because our auth middleware pulled it in directly before thie function call
    const user = await User.findById(req.user.id)

    //checking for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}