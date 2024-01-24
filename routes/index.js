const router = require("express").Router()


router.use("/auth", require('./auth.routes'))
router.use("/upload", require('./upload.routes'))
router.use("/users", require('./user.routes'))

module.exports = router
