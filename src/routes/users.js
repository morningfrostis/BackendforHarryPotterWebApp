const db = require('../models')
const User = db.User
const userRouter = require('express').Router()
// const { toggleTaskToFavorite, getUserById } = require('../controllers/users')


userRouter.post('/favorites/:marsId', async (request, response) => {
    try {
        //hay que pasarlo en body en vez de en params?
        const {marsId} = request.params
        const {user, isAdded} = await toggleTaskToFavorite({
            userId: request.user.id,
            marsId 
        }) 
        console.log(isAdded)

        if (isAdded) {  
        response.status(200).json('Data inserted succesfully')
        } else {
            response.status(200).json('Favorite deleted ok')
        } 
    } catch (error) {
        if (error.message === 'No exists data in database1') {
        response.status(400).json(error.message)
        
        } else {
            response.status(500).json('No exists data in database2')
            console.log(error)
        }
    }
})

userRouter.get('/favorites/:userId', async (request, response) => {
    try {
        const { userId } = request.params
        const user = await User.findOne({
            where: { id:userId },
            attributes: {
                exclude: ['password', 'salt', 'createdAt', 'updatedAt']
            },
            include: [{
                model: db.Characters,
                through: 'userCharacters',
                as: 'favorites',
            }]
        })

        response.status(200).json(user)

    } catch (error) {
        response.status(500).json(error.message)
    }
})

module.exports = userRouter

