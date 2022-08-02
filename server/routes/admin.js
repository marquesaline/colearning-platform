var express = require("express");
const controllerUsers = require("../controllers/UserControllers");
const controllerAdmin = require("../controllers/AdminController")
var router = express.Router();

router.get("/", controllerAdmin.index); /*elton   peguei o index do controllerUsers */

// admin dos usuários
router.get("/usuarios", controllerUsers.users);
router.get("/usuarios/:id/agendas", controllerUsers.showUserAgendas)
router.get("/usuarios/:id/agendamentos", controllerUsers.showUserEvents)
router.get("/sucesso", controllerUsers.sucess);

router.get("/usuarios/add", controllerUsers.add);
router.post("/usuarios/add", controllerUsers.create);

router.get("/usuarios/:id/editar", controllerUsers.edit);
router.put("/usuarios/:id/editar", controllerUsers.update);

router.get("/usuarios/:id/excluir", controllerUsers.exclude);
router.delete("/usuarios/:id/excluir", controllerUsers.delete); /*elton   acessando o id da turma do controllerUsers*/
router.get("/usuarios/:id", controllerUsers.show);

// admin das agendas
router.get("/agendas", controllerAdmin.adminAgendas)

router.get("/agendas/add", controllerAdmin.adminAddAgenda)
router.post("/agendas/add", controllerAdmin.createAgenda)

router.get("/agendas/:id", controllerAdmin.showAgenda)

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

module.exports = router;
