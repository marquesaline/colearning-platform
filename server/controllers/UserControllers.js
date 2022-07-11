const fs = require("fs")
const path = require("path")
const helper = require('../utils/helper')


const getUsers = () => JSON.parse(helper.read("users.json"));
const setUsers = (users) => helper.write("users.json", users);
const getUserId = (id) => getUsers().find((user) => user.id == id);
const getNextId = async () => {
  const users = await getUsers();
  const newId = parseInt(users[users.length - 1].id) + 1;
  return newId;
};

// controller

const controller = {
  sucess: async (req, res) => {
    res.render("usuario-sucesso", {
      title: `Parabéns todo o processo foi realizado com SUCESSO`,
    });
  },

  index: (req, res) => {
    res.render("admin-index", { title: "Dashboard Admin" });
  },

  lista: async (req, res) => {
    const users = await getUsers();
    res.render(`usuarios`, {
      title: "Lista de Usuários",
      users,
    });
  },

  add: async (req, res) => {
    const user = await getUserId(req.params.id);
    res.render(`usuario-adicionar`, {
      title: req.path == "/cadastro" ? `Cadastro` : `Adicionar Usuário`,
    });
  },

  create: async (req, res) => {
    const users = await getUsers();
    const id = await getNextId();
    const { nome, email, senha, avatar } = req.body;
    const newUser = {
      id,
      nome,
      senha,
      email,
      avatar: avatar || null,
    };
    users.push(newUser);
    setUsers(users);
    res.redirect("/users/sucesso");
  },

  edit: async (req, res) => {
    const user = await getUserId(req.params.id);
    res.render(`usuario-editar`, {
      title: `Editar Usuário ${req.params.nome}`,
      user,
    });
  },

  update: async (req, res) => {
    let users = await getUsers();
    users = users.map((user) => {
      if (user.id == req.params.id) {
        const { nome, email, senha } = req.body;
        return {
          id: user.id,
          nome: nome,
          email: email,
          senha: senha,
        };
      } else {
        return user;
      }
    });
    setUsers(users);
    res.redirect(`/sucesso`);
  },

  exclude: async (req, res) => {
    res.render("usuario-excluir", {
      title: `Excluir Usuário ${req.params.id}`,
      user: getUserId(req.params.id),
    });
  },

  delete: async (req, res) => {
    const users = await getUsers().filter(
      (user) => user.id != req.params.id
    );
    setUsers(users);
    res.redirect(`/users/sucesso`);
  },
  //arrumar
  show: async (req, res) => {
    res.render("usuario", {
      title: `Usuário`,
      user: getUserId(req.params.id),
    });
  },
};
module.exports = controller;
