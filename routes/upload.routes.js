const router = require("express").Router()
const { imageRoute } = require("../controllers/upload.controllers")
const { uploadPolicy } = require("../controllers/policy.controllers")
const uploader = require('./../middlewares/uploader.middleware')

router.post('/image', uploader.single('imageData'), imageRoute)
router.post('/policy', uploader.single('policyImageData'), uploadPolicy)

module.exports = router