
const { getAllUsers, getUser, getUserAgendas, getUserEvents, getUserByEmail } = require('../services/users')
const { User } = require("../database/models")
const { validationResult } = require('express-validator')
const bcrypt  = require('bcrypt')

const createSlug = async (name) => {
  let slug = await name.toLowerCase().replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
  return slug
}
const url = async (slug) => {
  let urlAgendamento = `http://localhost:3000/agendamento/${slug}`
  return urlAgendamento
}

// controller
const controller = {}
  
//sendo usado pra o cadastro do usuário

controller.loginProcess = async (req, res) => {
  const { email, senha  } = req.body
 
  let user = await getUserByEmail(email)
  if(user) {
    let passwordVerified = bcrypt.compareSync(senha, user.senha)
    if(passwordVerified) {
      
      req.session.userLogged = user      
      res.redirect('/conta')

    }
  }

  return res.render('login', {
    title: 'Login - CoLearning',
    errors: {
      email: {
        msg: "Email ou senha inválidos"
      }
    }
  })
}

controller.create = async (req, res) => {
    //validação dos campos
    const resultValidations = validationResult(req)

    if(resultValidations.errors.length > 0 ) {
      
      return res.render('cadastro', {
        title: 'Cadastro - CoLearning',
        errors: resultValidations.mapped(),
        oldData: req.body
      })
    } 

    const { nome, email, senha, avatar, admin, created_at, updated_at } = req.body;
    
    //conferir se já existe um email
    let emailExists = await getUserByEmail(email)
    if(emailExists) {
      res.render('cadastro', {
        title: 'Cadastro - CoLearning',
        errors: {
          email: {
            msg: 'Este email já está cadastrado'
          }
        },
        oldData: req.body
      })
    } 

    //criptografia da senha
    let senhaCripto = bcrypt.hashSync(senha, 3)

    const slug = await createSlug(nome)
    const urlAgendamento = await url(slug)

    await User.create({
      nome,
      senha: senhaCripto,
      email,
      slug,
      avatar: avatar || null,
      admin: !!admin,
      urlAgendamento,
      createdAt: created_at,
      updatedAt: updated_at
    })
    res.redirect("/login")
},

controller.editAccount = async (req, res) => {
    const userLogged = await req.session.userLogged
    const user = await getUser(userLogged.id)
    res.render(`areaLogada/minha-conta-editar`, {
      title: `Editar Usuário ${user.nome}`,
      user,
    });
},

controller.updateAccount = async (req, res) => {
    const userLogged = await req.session.userLogged
    const user = await getUser(userLogged.id)
    const resultValidations = validationResult(req)

    if(resultValidations.errors.length > 0 ) {
     
      return res.render('areaLogada/minha-conta-editar', {
        title: 'Editar usuário',
        errors: resultValidations.mapped(),
        oldData: req.body,
        user
      })
    } 
    
    const { nome, email, senha, avatar, created_at, updated_at } = req.body;
    
    let senhaCripto = bcrypt.hashSync(senha, 3)
    const id = user.id
    const slug = await createSlug(nome)
    const urlAgendamento = await url(slug)
   
    await User.update(
    { nome, slug, email, senha: senhaCripto,
      avatar: avatar || null,
      admin: user.admin,
      urlAgendamento,
      createdAt: created_at,
      updatedAt: updated_at
    }, 
    { where: {id} })  
    res.redirect(`/conta/minha-conta`);
},

controller.excludeUser = async (req, res) => {
    const userLogged = await req.session.userLogged
    const user = await getUser(userLogged.id)
    res.render("admin/usuario-excluir", {
      title: `Excluir Usuário ${req.params.id}`,
      user
    });
},

controller.deleteUser = async (req, res) => {
    const userLogged = await req.session.userLogged
    const id = await getUser(userLogged.id)
    await User.destroy({
      where: { id }
    })
    res.redirect(`/login`)
}
  //arrumar - está dando erro
controller.showAccount = async (req, res) => {
  console.log("entrou")
  const userLogged = await req.session.userLogged    

  const user = await getUser(userLogged.id)
  const agendas = await getUserAgendas(userLogged.id)
  res.render("areaLogada/minha-conta", {
    title: `Usuário - Minha Conta`,
    user,
    agendas
  })
}

controller.logout = async (req, res) => {
  req.session.destroy()
  return res.redirect("/")
}


module.exports = controller