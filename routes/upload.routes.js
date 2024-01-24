const router = require("express").Router()
const { imageRoute } = require("../controllers/upload.controllers")
const uploader = require('./../middlewares/uploader.middleware')

router.post('/image', uploader.single('imageData'), imageRoute)

module.exports = router