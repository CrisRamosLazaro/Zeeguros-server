const User = require('./../models/User.model')


const signUp = (req, res, next) => {

    const { email, password, username, firstName, lastName, avatar } = req.body

    User
        .create({ email, password, username, firstName, lastName, avatar })
        .then((createdUser) => {

            const { email, username, _id, name, lastName } = createdUser
            const user = { email, username, _id, name, lastName }

            res.status(201).json({ user })
        })
        .catch(err => {
            next(err)
        })
}


const logIn = (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return
            }

            if (foundUser.validatePassword(password)) {
                const authToken = foundUser.signToken()
                res.json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => next(err))
}


const verify = (req, res, next) => {
    res.status(200).json(req.payload)
}


module.exports = {
    signUp,
    logIn,
    verify
}