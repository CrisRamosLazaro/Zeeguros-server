const router = require('express').Router()
const { getAllUsers, getOneUser, editOne, deleteOne } = require('../controllers/user.controllers')
const { isAuthenticated } = require("../middlewares/verifyToken.middleware")

router.get('/getAllUsers', isAuthenticated, getAllUsers)
router.get("/getOneUser/:id", getOneUser)
router.put('/edit/:id', isAuthenticated, editOne)
router.delete('/delete/:id', deleteOne)

module.exports = router

