const express = require('express')
const showsRouter = express.Router()
const { Show } = require('../models/index')
const { body, validationResult } = require('express-validator')

showsRouter.get('/all', async (req, res) => {
    try {
        const allShows = await Show.findAll()
        res.send(allShows)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

showsRouter.get('/oneShow/:id', async(req, res) => {
    try {
        const shows = await Show.findByPk(req.params.id)
        res.send(shows)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

showsRouter.get('/genreType/:genre', async (req, res) => {
    try {
        const shows = await Show.findAll({where: { genre: `${req.params.genre}`}})
        res.send(shows)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

//UPDATE RATING

showsRouter.put('/updateShow/:id',
    body('rating').custom((value) => {
        if(value === null || value === undefined){
            return false
        }else{
            return true
        }
    }),
    async (req, res) => {
    try {
         //validation result
        const error = validationResult(req)
        if(!error.isEmpty()){
             return res.status(404).send({error: error.array()})
        }
         //validation result
        const show = await Show.findByPk(req.params.id)
        show.rating = req.body.rating
        show.save()
        res.send(show)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

showsRouter.put(
    '/updateStatus/:id',
    //
    body('status').custom((value) => {
        if(value === null || /\s/.test(value) || value.length < 5 || value.length > 26){
            return false
        }else{
            return true
        }
    }),
    //
    async (req, res) => {
    try {
        //validation result
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(404).send({error: error.array()})
        }
        //validation result
        const show = await Show.findByPk(req.params.id)
        show.status = req.body.status
        show.save()
        res.send(show)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
})

showsRouter.delete('/deleteShow/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id)
        show.destroy()
        res.send(show)
    } catch (error) {
        
    }
})


module.exports = showsRouter