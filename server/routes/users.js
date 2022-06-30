var express = require('express');
const controller = require('../controllers/UserControllers')
var router = express.Router();
 
    router.get('/', controller.index)                           /*elton   peguei o index do controller */

    router.get('/lista', controller.lista) 

    
    router.get('/sucesso', function(req, res, next){
        res.render('aluno-sucesso', {title: 'Parabéns! Deu tudo serto'})
    })
    
    router.get('/add', controller.add)                      
    router.post('/add', controller.create)
    
    
    router.get('/:id/editar', controller.edit)
    router.put('/:id/editar', controller.update)
    
    router.get('/:id/excluir',controller.exclude)
    router.delete('/:id/excluir', controller.delete)                    /*elton   acessando o id da turma do controller*/  
    
    router.get('/:id', controller.show)



module.exports = router;