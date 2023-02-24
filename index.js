const express = require('express')
const bodyParser = require('body-parser')
const marsRoutes = require('./src/routes/mars.js')
const syncApi = require ('./src/routes/syncApi')
const db = require('./src/models')
const userRouter = require('./src/routes/users.js')
const authRoutes = require('./src/routes/auth')
const dotenv = require('dotenv')
const {ensureAuthentication} = require('./src/middelware/auth')
const cors = require('cors')

dotenv.config()


const startApp = async () => {
    const app = express()
    app.use(cors())     
    const port = process.env.port

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(ensureAuthentication)
    app.get('/', (request, response) => {
        response.json('Aquí estoy')
    })

    app.use('/syncApi', syncApi)
    app.use('/users', userRouter)
    app.use('/auth', authRoutes)


try {
    app.listen(port, () => {
        console.log('APP running on port ' + port)
    })
} catch (error) {
    console.log(error)
    process.exit(error.message)
}

}

startApp()
