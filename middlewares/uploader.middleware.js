const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req) => {
        let folderName = "Zeeguros"
        if (req.route.path === "/avatar") {
            folderName = "avatars"
        } else if (req.route.path === "/policy") {
            folderName = "policies"
        }
        return { folder: folderName }
    },
})

module.exports = multer({ storage })
