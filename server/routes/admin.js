var express = require("express")
const controllerAdmin = require("../controllers/AdminController")
const controllerUser = require("../controllers/UserControllers")
var router = express.Router()
const avatar = require('../middlewares/AvatarUpload')
const validator = require("../middlewares/ValidatorRegister")
const loggedUser = require("../middlewares/LoggedUser")

router.get("/", loggedUser.isNotLogged, controllerAdmin.index) /*elton   peguei o index do controllerUsers */

// admin dos usuários
router.get("/usuarios", loggedUser.isNotLogged, controllerAdmin.users)
router.get("/usuarios/:id", controllerAdmin.showUser)
router.get("/usuarios/:id/agendas", loggedUser.isNotLogged, controllerAdmin.showUserAgendas)
router.get("/usuarios/:id/agendamentos", loggedUser.isNotLogged, controllerAdmin.showUserEvents)

router.get("/usuarios/add", loggedUser.isNotLogged, controllerAdmin.addUser)
router.post("/usuarios/add", avatar.upload, validator, controllerAdmin.createUser)

router.get("/usuarios/:id/editar", loggedUser.isNotLogged, controllerAdmin.editUser)
router.put("/usuarios/:id/editar", avatar.upload, validator, controllerAdmin.updateUser)

router.get("/usuarios/:id/excluir", loggedUser.isNotLogged, controllerAdmin.excludeUser)
router.delete("/usuarios/:id/excluir", controllerAdmin.deleteUser) /*elton   acessando o id da turma do controllerAdmin*/

// admin das agendas
router.get("/agendas", loggedUser.isNotLogged, controllerAdmin.adminAgendas)

router.get("/agendas/add", loggedUser.isNotLogged, controllerAdmin.adminAddAgenda)
router.post("/agendas/add", controllerAdmin.createAgenda)

router.get("/agendas/:id", loggedUser.isNotLogged, controllerAdmin.showAgenda)
router.get("/agendas/:id/agendamentos", loggedUser.isNotLogged, controllerAdmin.showAgendaEvents)


router.get("/agendas/:id/editar", loggedUser.isNotLogged, controllerAdmin.editAgenda)
router.put("/agendas/:id/editar", controllerAdmin.updateAgenda)

router.get("/agendas/:id/excluir", loggedUser.isNotLogged, controllerAdmin.excludeAgenda)
router.delete("/agendas/:id/excluir", controllerAdmin.deleteAgenda)

//admin dos eventos
router.get("/agendamentos", loggedUser.isNotLogged, controllerAdmin.adminEvents)

router.get("/agendamentos/add", loggedUser.isNotLogged, controllerAdmin.adminAddEvent)
router.post("/agendamentos/add", controllerAdmin.createEvent)

router.get("/agendamentos/:id", loggedUser.isNotLogged, controllerAdmin.showEvent)

router.get("/agendamentos/:id/editar", loggedUser.isNotLogged, controllerAdmin.editEvent)
router.put("/agendamentos/:id/editar", controllerAdmin.updateEvent)

router.get("/agendamentos/:id/excluir", loggedUser.isNotLogged, controllerAdmin.excludeEvent)
router.delete("/agendamentos/:id/excluir", controllerAdmin.deleteEvent)

router.get('/sair',  loggedUser.isNotLogged, controllerUser.logout)


module.exports = router
