const logged = async (req, res, next) => {
    if(req.session.userLogged) {
        return res.redirect('/conta')
    } 
    next()
}

module.exports = logged