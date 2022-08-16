const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname,"../public/images/avatar")),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()* 1e9) + "-" + file.originalname
        cb(null, file.fieldname + "-" + uniqueSuffix)
    }
})

const upload = multer({storage: storage})

const middlewares = {}

middlewares.upload = upload.single("avatar")

module.exports = middlewares