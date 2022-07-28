const fs = require("fs")
const path = require("path")
const get = require("../service/get")
const helper = require("../service/helper")
const set = require("../service/set")


const createSlug = async(name) => {
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
    const users = await get.users;
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
    const users = await get.users;
    const id = await get.nextById(get.users);
    const { 
      nome, 
      email, 
      senha, 
      avatar, 
      admin, 
      created_at,
      modified_at
     } = req.body;
    const slug = await createSlug(nome)
    const createdAt = await get.datesMoment(created_at)
    const modifiedAt = await get.datesMoment(modified_at)
    const newUser = {
      id,
      nome,
      senha,
      email,
      slug,
      avatar: avatar || null,
      admin: !!admin,
      createdAt,
      modifiedAt
    };
    users.push(newUser);
    set.users(users);
    res.redirect("/sucesso");
  },

  edit: async (req, res) => {
    const user = await get.byId(get.users, req.params.id);
    res.render(`admin/usuario-editar`, {
      title: `Editar Usuário ${req.params.nome}`,
      user,
    });
  },

  update: async (req, res) => {
    let users = await get.users;
    users = users.map((user) =>   {
      if (user.id == req.params.id) {
        const { 
          nome, 
          slug, 
          email, 
          senha, 
          admin,
          created_at,
          modified_at 
        } = req.body;
        
        return {
          id: user.id,
          nome: nome,
          slug: slug,
          email: email,
          senha: senha,
          avatar: null,
          admin: !!admin,
          createdAt: created_at,
          modifiedAt: get.datesMoment(modified_at)
        };
      } else {
        return user;
      }
    });
    set.users(users);
    res.redirect(`/sucesso`);
  },

  exclude: async (req, res) => {
    const user = await get.byId(get.users, req.params.id)
    res.render("admin/usuario-excluir", {
      title: `Excluir Usuário ${req.params.id}`,
      user
    });
  },

  delete: async (req, res) => {
    const users = await get.users.filter(
      (user) => user.id != req.params.id
    );
    set.users(users);
    res.redirect(`/sucesso`);
  },
  //arrumar
  show: async (req, res) => {
    const user = await get.byId(get.users, req.params.id)
    res.render("admin/usuario", {
      title: `Usuário`,
      user
    });
  },
};
module.exports = controller;
