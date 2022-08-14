const logged = {}
logged.isLogged = async (req, res, next) => {
    if(req.session.userLogged) {
        return res.redirect('/conta')
    } 
    next()
}
logged.isNotLogged = async (req, res, next) => {
    if(!req.session.userLogged) {
        return res.redirect('/login')
    }
    next()
}
module.exports = logged