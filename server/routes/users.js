var express = require('express');
const controller = require('../controllers/UserControllers')
var router = express.Router();

 
    router.get('/', controller.index)                           /*elton   peguei o index do controller */

    router.get('/lista', controller.lista) 

    
    //router.get('/turma'.controller.turma)
    
    router.get('/add', controller.add)                      
    router.post('/add', controller.create)
    
    
    router.get('/:id/editar', controller.edit)
    router.put('/:id/editar', controller.update)
    
    router.get('/:id/excluir', controller.delete)                    /*elton   acessando o id da turma do controller*/  
    
    router.get('/:id', controller.id)



module.exports = router;