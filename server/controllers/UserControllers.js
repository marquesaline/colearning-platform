const get = require("../utils/get")
const set = require("../utils/set")
const { getAllUsers, getUser, getUserAgendas, getUserEvents } = require('../services/users')
const { User } = require("../database/models")
const Sequelize = require("sequelize")
const { slug } = require("../utils/get")

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
    const {
      nome,
      email,
      senha,
      //avatar,
      admin,
      created_at,
      updated_at
    } = req.body;

    const slug = await createSlug(nome)
    const urlAgendamento = await url(slug)
    const avatarFileName = req.file.filename;
    await User.create({
      nome,
      senha,
      email,
      slug,
      avatar: avatarFileName || null,
      admin: !!admin,
      urlAgendamento,
      createdAt: created_at,
      updatedAt: updated_at
    });
    res.redirect("/login");
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
      //avatar,
      created_at,
      updated_at
    } = req.body;
    console.log(nome)
    const avatarFileName = req.file.filename;
    const user = await getUser(id)
    const slug = await createSlug(nome)
    const urlAgendamento = await url(slug)
    console.log(slug)
    await User.update(
    {
      nome,
      slug,
      email,
      senha,
      avatar: avatarFileName || null,
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