var express = require("express");
const controller = require("../controllers/UserControllers");
var router = express.Router();

router.get("/", controller.index); /*elton   peguei o index do controller */

// admin dos usuários
router.get("/usuarios", controller.lista);
router.get("/sucesso", controller.sucess);
router.get("/usuarios/add", controller.add);
router.post("/usuarios/add", controller.create);

router.get("/usuarios/:id/editar", controller.edit);
router.put("/usuarios/:id/editar", controller.update);

router.get("/usuarios/:id/excluir", controller.exclude);
router.delete(
  "/usuarios/:id/excluir",
  controller.delete
); /*elton   acessando o id da turma do controller*/
router.get("/usuarios/:id", controller.show);

// admin das agendas

//admin dos eventos

module.exports = router;
