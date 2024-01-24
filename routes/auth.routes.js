const router = require('express').Router()
const { signUp, logIn, verify } = require('../controllers/auth.controllers')
const { isAuthenticated } = require("../middlewares/verifyToken.middleware")

router.post('/signup', signUp)
router.post('/login', logIn)
router.get('/verify', isAuthenticated, verify)


module.exports = router