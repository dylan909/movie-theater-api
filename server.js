const express = require('express')
const showsRouter = require('./routes/showsRouter')
const userRouter = require('./routes/userRouter')
const cors = require('cors')


const app = express()
const port = 3000
app.use(express.json())


app.get('/', (req,res) => {
    res.sendStatus(200)
})

app.use(cors())
app.use('/user', userRouter)
app.use('/shows', showsRouter)





app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})