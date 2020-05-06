const express = require('express')
const multer = require('multer')


const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController')
const likeController = require('./controllers/likeController')


const routes = new express.Router()
const upload = multer(uploadConfig)

routes.get('/posts', PostController.index)
routes.post('/posts',upload.single('image'), PostController.store)

routes.post('/posts/:id/like', likeController.store)

module.exports = routes