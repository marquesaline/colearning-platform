const fs = require("fs");
const path = require("path");
const { title } = require("process");

//helper
const helper = {};

helper.read = (filename) =>
  fs.readFileSync(path.join(__dirname, `../data/${filename}`), "utf-8");

helper.write = (filename, data) =>
  fs.writeFileSync(
    path.join(__dirname, `../data/${filename}`),
    JSON.stringify(data, null, 2),
    "utf-8"
  );

const getAlunos = () => JSON.parse(helper.read("alunos.json"));
const setAlunos = alunos => helper.write("alunos.json", alunos);
const getAlunoId = id => getAlunos().find(aluno => aluno.id == id);
const getProximoId = async () => {
  const alunos = await getAlunos();
  const newId = parseInt(alunos[alunos.length - 1].id) + 1;
  return newId;
};

// controller

const controller = {
   sucess: (req, res) => res.send('SUCESSO'),
  
  index: (req, res) => {
    res.render("aluno-index", { title: "Dashboard Admin" });
  },

  lista: async (req, res) => {
    const alunos = await getAlunos();
    res.render(`alunos`, {
      title: "Lista de Alunos",
      alunos,
    });
  },

  add: async (req, res) => {
    const aluno = await getAlunoId(req.params.id);
    res.render(`aluno-adicionar`, {
    title: req.path == "/cadastro" ? `Cadastro`: `Adicionar Aluno`,
      //aluno,
    });
  },

  create: async (req, res) => {
    const alunos = await getAlunos()
    const id = await getProximoId();
    const { nome, email, senha, avatar } = req.body;
    const novoAluno = {
      id,
      nome,
      senha,
      email,
      avatar: avatar || null
    };
    alunos.push(novoAluno);
    setAlunos(alunos);
    res.redirect("/users/sucesso");
  },

  edit: async (req, res) => {
    const aluno = await getAlunoId(req.params.id);
    res.render(`aluno-editar`, {
      title: `Editar Aluno ${req.params.nome}`,
      aluno,
    });
  },

  update: async (req, res) => {
    let alunos = await getAlunos();
    alunos = alunos.map((aluno) => {
      if (aluno.id == req.params.id) {
        const { nome, email, senha } = req.body;
        return {
          id: aluno.id,
          nome: nome,
          email: email,
          senha: senha,
        };
      } else {
        return aluno;
      }
    });
    setAlunos(alunos);
    res.redirect(`/users/sucesso`);
  },

  exclude: (req, res) => {
    res.render('aluno-excluir', {
      title: `Excluir Aluno ${req.params.id}`,
      aluno: getAlunoId(req.params.id)
    })
  },

  //arrumar
  delete: async (req, res) => {
      const alunos = await getAlunos().filter(
        (aluno) => aluno.id != req.params.id 
        );
      setAlunos(alunos)
      res.redirect(`/users/sucesso`)
  },
  //arrumar
  show: async (req, res) => {
    res.render('aluno', {
      title: `Aluno ${req.params.id} `,
      aluno: getAlunoId(req.params.id),
    });
  },
};
module.exports = controller;
