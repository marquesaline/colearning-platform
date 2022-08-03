const get = require("../utils/get")
const set = require("../utils/set")
const {
  getAllUsers,
  getUser,
  getUserAgendas,
  getUserEvents
} = require('../services/users')
const {
  User
} = require("../database/models")
const Sequelize = require("sequelize")

const createSlug = async (name) => {
  let slug = await name.toLowerCase().replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  return slug
}


// controller
const controller = {
  sucess: async (req, res) => {
    res.render("usuario-sucesso", {
      title: `Parabéns todo o processo foi realizado com SUCESSO`,
    });
  },

  users: async (req, res) => {
    const users = await getAllUsers();
    res.render(`admin/usuarios`, {
      title: "Usuários",
      users,
    });
  },

  add: async (req, res) => {
    res.render(`admin/usuario-adicionar`, {
      title: req.path == "/cadastro" ? `Cadastro` : `Adicionar Usuário`,
    });
  },

  create: async (req, res) => {
    const {
      nome,
      email,
      senha,
      avatar,
      admin,
      created_at,
      updated_at
    } = req.body;

    const slug = await createSlug(nome)

    await User.create({
      nome,
      senha,
      email,
      slug,
      avatar: avatar || null,
      admin: !!admin,
      createdAt: created_at,
      updatedAt: updated_at
    });
    res.redirect("/admin/usuarios");
  },

  edit: async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    res.render(`admin/usuario-editar`, {
      title: `Editar Usuário ${req.params.nome}`,
      user,
    });
  },

  update: async (req, res) => {
    const { id } = req.params
    const {
      nome,
      slug,
      email,
      senha,
      avatar,
      admin,
      created_at,
      updated_at
    } = req.body;

    await User.update(
    {
      nome: nome,
      slug: slug,
      email: email,
      senha: senha,
      avatar: avatar || null,
      admin: !!admin,
      createdAt: created_at,
      updatedAt: updated_at
    }, 
    {
      where: {id}
    })  
    res.redirect(`/admin/usuarios`);
  },

  exclude: async (req, res) => {
    const user = await get.byId(get.users, req.params.id)
    res.render("admin/usuario-excluir", {
      title: `Excluir Usuário ${req.params.id}`,
      user
    });
  },

  delete: async (req, res) => {
    const { id } = req.params
    await User.destroy({
      where: { id }
    })
    res.redirect(`/admin/usuarios`);
  },
  //arrumar
  show: async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    res.render("admin/usuario", {
      title: `Usuário`,
      user
    });
  },
  showUserAgendas: async (req, res) => {
    const {
      id
    } = req.params
    const user = await getUser(id)
    const agendas = await getUserAgendas(id)
    res.render("admin/usuario-agendas", {
      title: `Agendas - ${ user.nome }`,
      user,
      agendas
    })
  },
  showUserEvents: async (req, res) => {
    const {
      id
    } = req.params
    const user = await getUser(id)
    const events = await getUserEvents(id)
    res.render("admin/usuario-agendamentos", {
      title: `Agendamentos - ${ user.nome }`,
      user,
      events
    })
  }
};
module.exports = controller;