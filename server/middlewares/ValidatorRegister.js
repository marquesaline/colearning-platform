const { check } = require('express-validator')

module.exports = [
    check('nome')
        .notEmpty().withMessage('Escreva um nome válido').bail()
        .trim(),
    check('email')
        .notEmpty().withMessage('Escreva um email ').bail()
        .trim().bail()
        .normalizeEmail().bail()
        .isEmail().withMessage('Digite um email correto'),
    check('senha')
        .notEmpty().withMessage('Escreva uma senha').bail()
        .isLength({min: 6}).withMessage('A senha precisa ter pelo menos 6 caracteres').bail()
        .trim()
]


