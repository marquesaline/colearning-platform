const fs = require("fs")
const path = require("path")
const get = require("../service/get")
const helper = require("../service/helper")

const getUsers = get.users
const setUsers = (users) => helper.write("users.json", users);
const getUserId = (id) => getUsers.find((user) => user.id == id);
const getNextId = get.nextById(getUsers)
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

  index: async (req, res) => {
    res.render("admin/admin-index", { 
      title: "Dashboard Admin"
     // user: await getUserId()
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
    const user = await getUserId(req.params.id);
    res.render(`admin/usuario-adicionar`, {
      title: req.path == "/cadastro" ? `Cadastro` : `Adicionar Usuário`,
    });
  },

  create: async (req, res) => {
    const users = await getUsers;
    const id = await getNextId;
    const { nome, email, senha, avatar, admin } = req.body;
    const slug = await createSlug(nome)
    
    const newUser = {
      id,
      nome,
      senha,
      email,
      slug,
      avatar: avatar || null,
      admin: !!admin
    };
    users.push(newUser);
    setUsers(users);
    res.redirect("/sucesso");
  },

  edit: async (req, res) => {
    const user = await getUserId(req.params.id);
    res.render(`admin/usuario-editar`, {
      title: `Editar Usuário ${req.params.nome}`,
      user,
    });
  },

  update: async (req, res) => {
    let users = await getUsers;
    users = users.map((user) =>   {
      if (user.id == req.params.id) {
        const { nome, slug, email, senha, admin } = req.body;
        
        return {
          id: user.id,
          nome: nome,
          slug: slug,
          email: email,
          senha: senha,
          avatar: null,
          admin: !!admin
        };
      } else {
        return user;
      }
    });
    setUsers(users);
    res.redirect(`/sucesso`);
  },

  exclude: async (req, res) => {
    res.render("admin/usuario-excluir", {
      title: `Excluir Usuário ${req.params.id}`,
      user: getUserId(req.params.id),
    });
  },

  delete: async (req, res) => {
    const users = await getUsers.filter(
      (user) => user.id != req.params.id
    );
    setUsers(users);
    res.redirect(`/sucesso`);
  },
  //arrumar
  show: async (req, res) => {
    res.render("admin/usuario", {
      title: `Usuário`,
      user: getUserId(req.params.id),
    });
  },
};
module.exports = controller;
