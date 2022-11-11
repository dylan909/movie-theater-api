const express = require('express')
const userRouter = express.Router()
const {User, Show} = require('../models/index')

userRouter.get('/all', async (req, res) => {
    try {
        const allUsers = await User.findAll()
        res.send(allUsers)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

userRouter.get('/:id', async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        res.send(user)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

userRouter.get('/:id/showsWatched', async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const movies = await user.getShows()
        res.send(movies)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

userRouter.post('/:id/newShow', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const newShow = await Show.create({
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        status: req.body.status
    })
    user.addShow(newShow)
    res.send(newShow)
})
userRouter.put('/:userId/addwatched/:movieId', async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    const show = await Show.findByPk(req.params.movieId)
    user.addShow(show)
    res.send(show)
})

module.exports = userRouter