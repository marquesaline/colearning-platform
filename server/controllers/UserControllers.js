
const { getAllUsers, getUser, getUserAgendas, getUserEvents } = require('../services/users')
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

    const {
      nome,
      email,
      senha,
      avatar,
      admin,
      created_at,
      updated_at
    } = req.body;
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
    const { id } = req.params
    const user = await getUser(id)
    res.render(`areaLogada/minha-conta-editar`, {
      title: `Editar Usuário ${user.nome}`,
      user,
    });
  },

controller.updateAccount = async (req, res) => {
    const { id } = req.params
    const {
      nome,
      email,
      senha,
      avatar,
      created_at,
      updated_at
    } = req.body;
 
    const user = await getUser(id)
    const slug = await createSlug(nome)
   
    await User.update(
    {
      nome,
      slug,
      email,
      senha,
      avatar: avatar || null,
      admin: user.admin,
      urlAgendamento,
      createdAt: created_at,
      updatedAt: updated_at
    }, 
    {
      where: {id}
    })  
    res.redirect(`/conta/${id}/minha-conta`);
  },

controller.excludeUser = async (req, res) => {
    const { id } = req.params
    const user = await getUser(userId)
    res.render("admin/usuario-excluir", {
      title: `Excluir Usuário ${req.params.id}`,
      user
    });
  },

controller.deleteUser = async (req, res) => {
    const { id } = req.params
    await User.destroy({
      where: { id }
    })
    res.redirect(`/login`);
  },
  //arrumar
controller.showAccount = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    res.render("areaLogada/minha-conta", {
      title: `Usuário`,
      user
    });
  },
  // showUserAgendas: async (req, res) => {
  //   const {
  //     id
  //   } = req.params
  //   const user = await getUser(id)
  //   const agendas = await getUserAgendas(id)
  //   res.render("admin/usuario-agendas", {
  //     title: `Agendas - ${ user.nome }`,
  //     user,
  //     agendas
  //   })
  // },
  // showUserEvents: async (req, res) => {
  //   const { id } = req.params
  //   const user = await getUser(id)
  //   const events = await getUserEvents(id)
  //   res.render("admin/usuario-agendamentos", {
  //     title: `Agendamentos - ${ user.nome }`,
  //     user,
  //     events
  //   })
  // }

module.exports = controller