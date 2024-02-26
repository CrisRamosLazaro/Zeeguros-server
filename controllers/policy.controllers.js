const Policy = require('../models/Policy.model')

const uploadPolicy = (req, res, next) => {

    if (!req.file) {
        return res.status(500).json({ errorMessage: 'Error uploading policy' });
    }

    const { _id: owner } = req.payload
    const url = req.file.path

    Policy
        .create({ owner, url })
        .then(() => res.status(201).json({ cloudinary_url: url }))
        .catch(err => res.status(500).json({ errorMessage: 'Error saving policy', err }))

}

const getOnePolicy = (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

// requesterId must be either the user or the Broker the user authorized to look 
const getUser = (req, res, next) => {
    const { userId } = req.params
    const { _id: requesterId } = req.payload

    if (userId !== requesterId) {
        return res.status(403).json({ message: 'Unauthorized' })
    }

    Policy
        .find({ owner: userId })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deletePolicy = (req, res, next) => {

    const { id } = req.params

    Policy
        .findByIdAndDelete(id)
        .then(() => res.sendStatus(204))
        .catch(err => console.log(err))
}

module.exports = {
    uploadPolicy,
    getOnePolicy,
    getUser,
    deletePolicy
}