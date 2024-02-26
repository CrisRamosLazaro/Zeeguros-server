const User = require("../models/User.model")


const getAllUsers = (req, res, next) => {

    User
        .find()
        .select({ username: 1, avatar: 1, role: 1, _id: 1, firstName: 1, lastName: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOneUser = (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editOne = (req, res, next) => {

    const { email, password, username, firstName, lastName, avatar } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { email, password, username, firstName, lastName, avatar })
        .then(() => res.sendStatus(204))
        .catch(err => console.log(err))
}

const deleteOne = (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.sendStatus(204))
        .catch(err => console.log(err))
}

module.exports = {
    getAllUsers,
    getOneUser,
    editOne,
    deleteOne
}