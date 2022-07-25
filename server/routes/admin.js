var express = require("express");
const controllerUsers = require("../controllers/UserControllers");
const controllerAgendas = require("../controllers/AdminController")
var router = express.Router();

router.get("/", controllerUsers.index); /*elton   peguei o index do controllerUsers */

// admin dos usuários
router.get("/usuarios", controllerUsers.users);
router.get("/sucesso", controllerUsers.sucess);

router.get("/usuarios/add", controllerUsers.add);
router.post("/usuarios/add", controllerUsers.create);

router.get("/usuarios/:id/editar", controllerUsers.edit);
router.put("/usuarios/:id/editar", controllerUsers.update);

router.get("/usuarios/:id/excluir", controllerUsers.exclude);
router.delete("/usuarios/:id/excluir", controllerUsers.delete); /*elton   acessando o id da turma do controllerUsers*/
router.get("/usuarios/:id", controllerUsers.show);

// admin das agendas
router.get("/agendas", controllerAgendas.adminAgendas)
router.get("/agendas/add", controllerAgendas.adminAddAgenda)
router.post("/agendas/add", controllerAgendas.createAgenda);
//admin dos eventos

module.exports = router;
