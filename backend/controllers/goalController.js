const Goal = require('../models/goalModel')

// @desc gets goals
// @route GET /api/goals
// @access Private
const getGoals = async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
}

// @desc creates a goal
// @route POST /api/goals
// @access Private
const setGoal = async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
}

// @desc updates a goals
// @route PUT /api/goals
// @access Private
const updateGoal = async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updateGoal)
}

// @desc deletes a goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    await goal.remove()
    res.status(200).json({id: req.params.id})
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}