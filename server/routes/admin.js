var express = require("express")
const controllerAdmin = require("../controllers/AdminController")
const controllerUser = require("../controllers/UserControllers")
var router = express.Router()
const avatar = require('../middlewares/AvatarUpload')
const validator = require("../middlewares/ValidatorRegister")
const loggedUser = require("../middlewares/LoggedUser")

router.get("/", controllerAdmin.index) /*elton   peguei o index do controllerUsers */

// admin dos usuários
router.get("/usuarios", controllerAdmin.users)
router.get("/usuarios/:id/agendas", controllerAdmin.showUserAgendas)
router.get("/usuarios/:id/agendamentos", controllerAdmin.showUserEvents)

router.get("/usuarios/add", controllerAdmin.addUser)
router.post("/usuarios/add", avatar.upload, validator, controllerAdmin.createUser)

router.get("/usuarios/:id/editar", controllerAdmin.editUser)
router.put("/usuarios/:id/editar", avatar.upload, validator, controllerAdmin.updateUser)

router.get("/usuarios/:id/excluir", controllerAdmin.excludeUser)
router.delete("/usuarios/:id/excluir", controllerAdmin.deleteUser) /*elton   acessando o id da turma do controllerAdmin*/
router.get("/usuarios/:id", controllerAdmin.showUser)

// admin das agendas
router.get("/agendas", controllerAdmin.adminAgendas)

router.get("/agendas/add", controllerAdmin.adminAddAgenda)
router.post("/agendas/add", controllerAdmin.createAgenda)

router.get("/agendas/:id", controllerAdmin.showAgenda)
router.get("/agendas/:id/agendamentos", controllerAdmin.showAgendaEvents)


router.get("/agendas/:id/editar", controllerAdmin.editAgenda)
router.put("/agendas/:id/editar", controllerAdmin.updateAgenda)

router.get("/agendas/:id/excluir", controllerAdmin.excludeAgenda)
router.delete("/agendas/:id/excluir", controllerAdmin.deleteAgenda)

//admin dos eventos
router.get("/agendamentos", controllerAdmin.adminEvents)

router.get("/agendamentos/add", controllerAdmin.adminAddEvent)
router.post("/agendamentos/add", controllerAdmin.createEvent)

router.get("/agendamentos/:id", controllerAdmin.showEvent)

router.get("/agendamentos/:id/editar", controllerAdmin.editEvent)
router.put("/agendamentos/:id/editar", controllerAdmin.updateEvent)

router.get("/agendamentos/:id/excluir", controllerAdmin.excludeEvent)
router.delete("/agendamentos/:id/excluir", controllerAdmin.deleteEvent)

router.get('/sair',  loggedUser.isNotLogged, controllerUser.logout)


module.exports = router
